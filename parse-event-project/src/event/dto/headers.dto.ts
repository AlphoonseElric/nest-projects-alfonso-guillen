import { IsString } from 'class-validator';

export class HeadersDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}
