import { ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ActionDto } from './action.dto';

export class ReceiptDto {
  @IsString()
  timestamp: string;

  @IsString()
  processingTimeMillis: string;

  @ValidateNested()
  @Type(() => ActionDto)
  action: ActionDto;
}
