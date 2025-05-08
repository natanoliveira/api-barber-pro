import { Costumer } from "src/costumers/entities/costumer.entity";
import { Haircut } from "src/haircuts/entities/haircut.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity('service')
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'costumer_id' })
    customerId: string;

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt?: Date;

    @Column({ type: 'datetime', name: 'updated_at', onUpdate: 'CURRENT_TIMESTAMP()' })
    updatedAt?: Date;

    @ManyToOne(() => Haircut, haircut => haircut.services)
    @JoinColumn({ name: 'haircut_id' })
    haircut: Haircut;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, user => user.services)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Costumer, costumer => costumer.services)
    @JoinColumn({ name: 'costumer_id' })
    costumer: Costumer;
}
