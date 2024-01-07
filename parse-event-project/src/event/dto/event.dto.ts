import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SesDto } from './ses.dto';

export class EventDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SesDto)
  Records: SesDto[];
}
