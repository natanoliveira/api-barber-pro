import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Status } from "../interfaces/haircuts.interface";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, Entity } from "typeorm";
import { Service } from "src/services/entities/service.entity";

@Entity('haircut')
export class Haircut {
    @ApiProperty({ description: '' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome' })
    @Column({ nullable: false })
    name: string;

    @ApiProperty()
    @Column({ nullable: false })
    price: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @ApiProperty({ nullable: true, description: 'Data de cadastro' })
    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt?: Date;

    @ApiProperty({ description: 'Data de atualização' })
    @Column({ name: 'updated_at', type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP()' })
    updatedAt?: Date;

    @ManyToOne(() => User, user => user.haircuts)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Service, service => service.haircut)
    services: Service[];
}
