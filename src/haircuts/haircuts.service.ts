import { Injectable } from '@nestjs/common';
import { CreateHaircutDto } from './dto/create-haircut.dto';
import { UpdateHaircutDto } from './dto/update-haircut.dto';

@Injectable()
export class HaircutsService {
  create(createHaircutDto: CreateHaircutDto) {
    return 'This action adds a new haircut';
  }

  findAll() {
    return `This action returns all haircuts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} haircut`;
  }

  update(id: number, updateHaircutDto: UpdateHaircutDto) {
    return `This action updates a #${id} haircut`;
  }

  remove(id: number) {
    return `This action removes a #${id} haircut`;
  }
}
