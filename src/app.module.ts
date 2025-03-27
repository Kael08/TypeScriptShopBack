import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

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
    UsersModule,
  ],
})
export class AppModule {}
