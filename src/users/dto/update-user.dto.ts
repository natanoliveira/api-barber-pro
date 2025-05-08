import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Status } from '../interfaces/users.interface';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    readonly status?: Status;
}

// export class UpdateUserDto {
//     name?: string;
//     email?: string;
//     endereco?: string;
//     password?: string;
//     stripeCustomerId?: string;
//     status?: Status;
// }
