import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HaircutsService } from './haircuts.service';
import { CreateHaircutDto } from './dto/create-haircut.dto';
import { UpdateHaircutDto } from './dto/update-haircut.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Haircuts')
@Controller('haircuts')
export class HaircutsController {
  constructor(private readonly haircutsService: HaircutsService) { }

  @Post()
  create(@Body() createHaircutDto: CreateHaircutDto) {
    return this.haircutsService.create(createHaircutDto);
  }

  @Get()
  findAll() {
    return this.haircutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.haircutsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHaircutDto: UpdateHaircutDto) {
    return this.haircutsService.update(+id, updateHaircutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.haircutsService.remove(+id);
  }
}
