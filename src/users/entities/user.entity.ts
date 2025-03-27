import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentHistory } from './payment-history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  balance: number;

  @OneToMany(() => PaymentHistory, (payment) => payment.user)
  history: PaymentHistory[];
}
