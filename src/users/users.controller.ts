import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe, Injectable, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FilterUsersDto } from './dto/filter-users.dtos';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthTokenGard } from 'src/auth/guard/auth-token.guard';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/auth/common/auth.constants';

@ApiTags('Users')
@Controller('users')
// @UseGuards(AuthAdminGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterUsersDto: FilterUsersDto
  ) {
    return await this.usersService.findAll(paginationDto, filterUsersDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthTokenGard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ): Promise<User> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Put(':id/deactivate')
  async deactivateUser(@Param('id', ParseIntPipe) id: number): Promise<User | undefined> {
    return this.usersService.deactivateUser(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(+id);
  }
}
