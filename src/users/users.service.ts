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
    console.log('Searching user with ID:', userId);
  
    const user = await this.usersRepository
  .createQueryBuilder('user')
  .where('user.id = :id', { id: userId })
  .getOne();

console.log('Found user with queryBuilder:', user);

  
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
    });
  }
  
  
}
