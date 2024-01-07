import { Module } from '@nestjs/common';
import { EventController } from '../event/event.controller';
import { MapperService } from '../event/service/mapper.service';

@Module({
  controllers: [EventController],
  providers: [MapperService],
})
export class EventModule {}
