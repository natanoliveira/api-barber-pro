import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../interfaces/subscriptions.interface";

@Entity('user')
export class User {
    @ApiProperty({ description: 'ID da usuário' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome do Usuário' })
    @Column({ nullable: true })
    name: string;

    @ApiProperty({ nullable: true, description: 'Seu melhor e-mail', example: 'email@gmail.com' })
    @Column({ nullable: true })
    email: string;

    @ApiProperty({ nullable: true, description: 'Endereço com número, bairro, cep, cidade, estado' })
    @Column({ nullable: true })
    endereco: string;

    @ApiProperty({ nullable: false })
    @Column({ nullable: false })
    password: string;

    @ApiProperty({ nullable: true })
    @Column({ nullable: true })
    stripe_costumer_id: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    is_active: Status;

    @ApiProperty({ nullable: true, description: 'Data de cadastro do usuário' })
    @Column({ nullable: true })
    created_at: Date;

    @ApiProperty({ description: 'Data de atualização do usuário' })
    @Column({ nullable: true })
    updated_at: Date;

}
