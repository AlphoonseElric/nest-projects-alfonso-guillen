// src/app.module.ts

import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MapperService } from './event/service/mapper.service';

@Module({
  imports: [EventModule],
  controllers: [],
  providers: [MapperService],
})
export class AppModule {}
