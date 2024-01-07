// src/event/event.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { MapperService } from '../event/service/mapper.service';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly mapperService: MapperService) {}

  @Post('process-event')
  processEvent(@Body(new ValidationPipe()) json: any) {
    const eventDto = this.mapperService.mapJsonToEventDto(json);
    const result = this.processEventDto(eventDto);
    return this.formatResponse(result);
  }

  private processEventDto(eventDto: EventDto) {
    const records = eventDto.Records;

    // Assuming there's only one record in the array for simplicity
    const eventRecord = records[0];

    const {
      spamVerdict,
      virusVerdict,
      spfVerdict,
      dkimVerdict,
      dmarcVerdict,
      processingTimeMillis,
    } = eventRecord.ses.receipt;
    const { timestamp, source, destination } = eventRecord.ses.mail;

    return {
      spam: spamVerdict.status === 'PASS',
      virus: virusVerdict.status === 'PASS',
      dns:
        spfVerdict.status === 'PASS' &&
        dkimVerdict.status === 'PASS' &&
        dmarcVerdict.status === 'PASS',
      mes: this.formatTimestampToMonth(timestamp),
      retrasado: parseInt(processingTimeMillis, 10) > 1000, // Ensure processingTimeMillis is a number
      emisor: this.extractUsernameFromEmail(source),
      receptor: destination.map((recipient) =>
        this.extractUsernameFromEmail(recipient),
      ),
    };
  }

  private formatTimestampToMonth(timestamp: string): string {
    return new Date(timestamp).toLocaleString('en-US', { month: 'long' });
  }

  private extractUsernameFromEmail(email: string): string {
    return email.split('@')[0];
  }

  private formatResponse(result: any) {
    // You can add additional formatting or validation logic here
    return result;
  }
}
