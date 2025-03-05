import { PartialType } from '@nestjs/swagger';
import { CreateHaircutDto } from './create-haircut.dto';

export class UpdateHaircutDto extends PartialType(CreateHaircutDto) {}
