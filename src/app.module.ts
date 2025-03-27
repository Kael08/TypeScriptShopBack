import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',     // Пользователь БД
      password: '5567',     // Пароль
      database: 'shopdb',         // Название БД
      autoLoadEntities: true,   // Автоматически подгружает сущности
      synchronize: true,        // Синхронизация структуры таблиц
    }),
    UsersModule,
  ],
})
export class AppModule {}
