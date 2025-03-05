import { IsOptional, IsInt, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    @Max(50)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset?: number;
}