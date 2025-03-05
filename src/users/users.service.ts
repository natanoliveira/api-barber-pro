import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ResponseUsersDto } from './dto/response-users.dto';
import { FilterUsersDto } from './dto/filter-users.dtos';
import { Status } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const existsUser = await this.usersRepository.findOne({ where: { email } });

    if (existsUser) {
      throw new HttpException(`E-mail ${email} já utilizado`, HttpStatus.BAD_REQUEST);
    }

    const newUser = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(newUser);

    delete savedUser.password;
    return savedUser;
  }

  async findAll(
    paginationDto?: PaginationDto,
    filterUsersDto?: FilterUsersDto
  ): Promise<any> {

    const { limit = 10, offset = 0 } = paginationDto || {};
    const { name, email } = filterUsersDto || {};

    const whereConditions = [];

    if (name) {
      whereConditions.push({ name: Like(`%${name}%`) });
    }

    if (email) {
      whereConditions.push({ email: Like(`%${email}%`) });
    }

    const whereCondition = whereConditions.length > 0 ? whereConditions : {};

    const allUsers = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'endereco', 'stripeCostumerId', 'createdAt', 'updatedAt', 'status'],
      where: whereCondition,
      take: limit,
      skip: offset
    });

    if (!allUsers || allUsers.length === 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.NOT_FOUND);
    }

    const count = allUsers.length;

    return new ResponseUsersDto(allUsers, count, offset, limit);
  }

  async findOne(id: number): Promise<User | undefined> {
    const findUser = await this.usersRepository.findOne({
      where: { id }
    });

    if (!findUser) {
      throw new HttpException('Usário inexistente', HttpStatus.NOT_FOUND);
    }

    delete findUser.password;
    return findUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {

    const existsUser = await this.usersRepository.findOne({ where: { id } });

    if (!existsUser || existsUser === null) {
      throw new HttpException('Usuário não cadastrado', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (updatedUser) {
      delete updatedUser.password;
    }
    return updatedUser;
  }

  async deactivateUser(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(`Usuário com ID ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    user.status = Status.INACTIVE;
    return this.usersRepository.save(user);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
