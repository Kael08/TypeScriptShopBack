import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaymentHistory } from './entities/payment-history.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PaymentHistory)
    private historyRepository: Repository<PaymentHistory>,
  ) {}

  async debit(userId: number, dto: CreateTransactionDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.balance < dto.amount) throw new BadRequestException('Insufficient funds');

    // Начинаем транзакцию
    await this.usersRepository.manager.transaction(async (manager) => {
      user.balance -= dto.amount;
      await manager.save(user);

      const payment = this.historyRepository.create({
        user,
        action: 'debit',
        amount: dto.amount,
      });

      await manager.save(payment);
    });
  }
}
