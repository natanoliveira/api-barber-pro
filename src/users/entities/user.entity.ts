import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../interfaces/users.interface";
import { Subscription } from 'src/subscriptions/entities/subscription.entity'
import { Haircut } from 'src/haircuts/entities/haircut.entity'
import { Service } from "src/services/entities/service.entity";

@Entity('user')
export class User {
    @ApiProperty({ description: 'ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome' })
    @Column({ nullable: true })
    name: string;

    @ApiProperty({ nullable: true, description: 'Seu melhor e-mail', example: 'email@gmail.com' })
    @Column({ nullable: true })
    email?: string;

    @ApiProperty({ nullable: true, description: 'Endereço com número, bairro, cep, cidade, estado' })
    @Column({ nullable: true })
    endereco?: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty({ nullable: true })
    @Column({ name: 'stripe_costumer_id', nullable: true })
    stripeCostumerId?: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @ApiProperty({ nullable: true, description: 'Data de cadastro' })
    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt?: Date;

    @ApiProperty({ description: 'Data de atualização' })
    @Column({ name: 'updated_at', type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP()' })
    updatedAt?: Date;

    @OneToOne(() => Subscription, subscription => subscription.user)
    subscription: Subscription;

    @OneToMany(() => Haircut, haircut => haircut.user)
    haircuts: Haircut[];

    @OneToMany(() => Service, service => service.user)
    services: Service[];
}