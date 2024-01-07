import { ValidateNested, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CommonHeadersDto } from './common-headers.dto';

export class MailDto {
  @IsString()
  timestamp: string;

  @IsString()
  source: string;

  @IsString()
  messageId: string;

  @IsArray()
  destination: string[];

  @ValidateNested()
  @Type(() => CommonHeadersDto)
  commonHeaders: CommonHeadersDto;

  // Add other properties as needed
}
