import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../interfaces/subscriptions.interface";

@Entity('subscription')
export class Subscription {
    @ApiProperty({ description: '' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @ApiProperty()
    @Column({ nullable: true, name: 'price_id' })
    priceId: number;

    @ApiProperty({ nullable: true, description: 'Data de cadastro' })
    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt?: Date;

    @ApiProperty({ description: 'Data de atualização' })
    @Column({ name: 'updated_at', type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP()' })
    updatedAt?: Date;

    @OneToOne(() => User, user => user.subscription)
    @JoinColumn({ name: 'user_id' })
    user: User;

}
