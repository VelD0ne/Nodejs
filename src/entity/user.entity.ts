import { Entity, Column, PrimaryColumn, BeforeInsert, IsNull } from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export default class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column({ nullable: true })
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
