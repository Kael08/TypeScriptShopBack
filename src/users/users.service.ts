import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject, // ✅ Используем из @nestjs/common
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaymentHistory } from './entities/payment-history.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PaymentHistory)
    private historyRepository: Repository<PaymentHistory>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async debit(userId: number, dto: CreateTransactionDto): Promise<void> {
    console.log('Searching user with ID:', userId);

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    console.log('Found user:', user);

    if (!user) throw new NotFoundException('User not found');
    if (user.balance < dto.amount) throw new BadRequestException('Insufficient funds');

    await this.usersRepository.manager.transaction(async (manager) => {
      user.balance -= dto.amount;
      await manager.save(user);

      const payment = this.historyRepository.create({
        user,
        action: 'debit',
        amount: dto.amount,
      });

      await manager.save(payment);

      // Удаляем кэш после изменения баланса
      await this.cacheManager.del(`user-${userId}`);
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    const cachedUser = await this.cacheManager.get(`user-${userId}`);
    if (cachedUser) {
      return cachedUser as User;
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (user) {
      // ✅ Передаем ttl как число, а не объект
      await this.cacheManager.set(`user-${userId}`, user, 3600); 
      return user;
    }

    return null;
  }
}
