import { Controller, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/debit')
  async debit(
    @Param('id') id: number,
    @Body() dto: CreateTransactionDto,
  ): Promise<void> {
    await this.usersService.debit(id, dto);
  }
}
