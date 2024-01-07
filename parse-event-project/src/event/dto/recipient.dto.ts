import { IsString } from 'class-validator';

export class RecipientDto {
  @IsString()
  recipient: string;
}
