import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5567',
      database: 'shopdb',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    CacheModule.register({
      store: redisStore as unknown as string, 
      host: 'localhost',
      port: 6379,
      ttl: 60,
    }),
    UsersModule,
  ],
})
export class AppModule {}
