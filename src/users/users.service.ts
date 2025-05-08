import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ResponseWithPaginationDto } from '../common/dto/response-with-pagination.dto';
import { FilterUsersDto } from './dto/filter-users.dtos';
import { Status } from './interfaces/users.interface';
import { HashingServicePrococol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly hashingService: HashingServicePrococol,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const { email } = createUserDto;
    const existsUser = await this.usersRepository.findOne({ where: { email } });

    if (existsUser) {
      throw new HttpException(`E-mail ${email} já utilizado`, HttpStatus.BAD_REQUEST);
    }

    try {
      // Criando hash de senha
      const password = await this.hashingService.hashPassword(createUserDto.password);
      createUserDto.password = password;

      const newUser = this.usersRepository.create(createUserDto);
      const savedUser = await this.usersRepository.save(newUser);
      if (!savedUser) {
        throw new HttpException('Erro ao cadastrar o usuário', HttpStatus.BAD_REQUEST);
      }

      // Remove a senha do usuário antes de retornar
      delete savedUser.password;
      return savedUser;

    } catch (error) {
      Logger.log(error, 'createUsers');
      throw new HttpException('Erro ao cadastrar o usuário', HttpStatus.BAD_REQUEST);
    }

  }

  async findAll(paginationDto?: PaginationDto, filterUsersDto?: FilterUsersDto): Promise<any> {

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

    return new ResponseWithPaginationDto(allUsers, count, offset, limit);
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

    try {

      updateUserDto.name = updateUserDto.name ? updateUserDto.name : existsUser.name;
      updateUserDto.email = updateUserDto.email ? updateUserDto.email : existsUser.email;

      if (updateUserDto.password) {
        const passwordHash = await this.hashingService.hashPassword(updateUserDto.password);
        updateUserDto.password = passwordHash;
      }

      await this.usersRepository.update(id, updateUserDto);
      const updatedUser = await this.usersRepository.findOne({ where: { id } });
      if (updatedUser) {
        delete updatedUser.password;
      }
      return updatedUser;
    } catch (error) {
      Logger.log(`updateUsers: ${error}`);
      throw new HttpException('Falha ao atualizar usuário', HttpStatus.BAD_REQUEST);
    }
  }

  async deactivateUser(id: number): Promise<User | undefined> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new HttpException(`Usuário com ID ${id} não encontrado`, HttpStatus.NOT_FOUND);
      }

      user.status = Status.INACTIVE;
      return this.usersRepository.save(user);
    } catch (error) {
      Logger.log(`deactivateUser: ${error}`);
      throw new HttpException('Falha ao desativar  usuário', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user || user === null) {
      throw new HttpException(`Usuário com ID ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    try {

      const result = await this.usersRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      return { message: 'Usuário removido com sucesso!' };

    } catch (error) {
      Logger.log(`removeUser: ${error}`);
      throw new HttpException('Falha ao remover usuário', HttpStatus.BAD_REQUEST);
    }
  }
}
