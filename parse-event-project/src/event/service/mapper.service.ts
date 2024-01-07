// src/event-service/mapper.service.ts

import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { EventDto } from '../dto/event.dto'; // Update the import path

@Injectable()
export class MapperService {
  mapJsonToEventDto(json: any): EventDto {
    const eventDto = plainToClass(EventDto, json);
    this.validateDto(eventDto);
    return eventDto;
  }

  private async validateDto(dto: any): Promise<void> {
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessage = this.buildErrorMessage(errors);
      throw new Error(errorMessage);
    }
  }

  private buildErrorMessage(errors: any[]): string {
    const errorMessage = 'Validation failed.';

    const errorMessages = errors.map((error) => {
      const constraints = error.constraints;
      if (constraints) {
        return Object.values(constraints).join(', ');
      }
    });

    return `${errorMessage} ${errorMessages.join(', ')}`;
  }
}
