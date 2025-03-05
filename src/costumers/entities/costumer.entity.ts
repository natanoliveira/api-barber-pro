import { ApiProperty } from "@nestjs/swagger";
import { Service } from "src/services/entities/service.entity";
import { Status } from "src/users/interfaces/users.interface";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity('costumer')
export class Costumer {
    @ApiProperty({ description: 'ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome' })
    @Column({ nullable: true })
    name: string;

    @ApiProperty({ nullable: true, description: 'Seu melhor e-mail', example: 'email@gmail.com' })
    @Column({ nullable: true })
    email?: string;

    @ApiProperty({ nullable: true, description: 'Seu whatsapp', example: '86988037777' })
    @Column({ nullable: true })
    phone?: string;

    @ApiProperty({ description: 'Data de nascimento' })
    @Column({ name: 'born_date', type: 'date' })
    bornDate?: Date;

    @ApiProperty({ nullable: true, description: 'Endereço com número, bairro, cep, cidade, estado' })
    @Column({ nullable: true })
    endereco?: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @ApiProperty({ nullable: true, description: 'Data de cadastro' })
    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt?: Date;

    @ApiProperty({ description: 'Data de atualização' })
    @Column({ name: 'updated_at', type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP()' })
    updatedAt?: Date;

    @OneToMany(() => Service, service => service.user)
    services: Service[];
}
