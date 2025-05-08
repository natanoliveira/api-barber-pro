import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { HashingServicePrococol } from './hash/hashing.service';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly hashingService: HashingServicePrococol,

        // Injetando configuração do auth/config/jwt.config.ts
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService

    ) { }

    async authenticate(signInDto: SignInDto) {

        const user = await this.usersRepository.findOne({
            where: { email: signInDto.email },
            select: ['id', 'email', 'password', 'name'],
        });

        if (!user) {
            throw new HttpException('Falha na autenticação', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await this.hashingService.comparePassword(
            signInDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new HttpException('Senha/Usuário incorretos', HttpStatus.UNAUTHORIZED);
        }
        // gerando token
        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}
