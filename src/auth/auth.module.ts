import { Global, Module } from '@nestjs/common';
import { HashingServicePrococol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

// Global module to be used in the entire application
@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())
    ],
    providers: [
        {
            provide: HashingServicePrococol,
            useClass: BcryptService,
        },
        AuthService,
    ],
    exports: [
        HashingServicePrococol,
        JwtModule,
        ConfigModule
    ],
    controllers: [AuthController],
})
export class AuthModule { }
