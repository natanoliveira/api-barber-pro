import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Status } from '../interfaces/users.interface';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
    name?: string;
    email?: string;
    endereco?: string;
    password?: string;
    stripeCustomerId?: string;
    status?: Status;
}
