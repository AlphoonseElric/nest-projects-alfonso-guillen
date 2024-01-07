import { IsString, IsArray } from 'class-validator';

export class CommonHeadersDto {
  @IsString()
  returnPath: string;

  @IsArray()
  desde: string[];

  @IsString()
  date: string;

  @IsArray()
  to: string[];

  @IsString()
  messageId: string;

  @IsString()
  subject: string;
}
