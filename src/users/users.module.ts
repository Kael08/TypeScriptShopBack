import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { User } from './entities/user.entity';
import { PaymentHistory } from './entities/payment-history.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PaymentHistory]),
    CacheModule.register({
      ttl: 3600,
      isGlobal: true, 
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
