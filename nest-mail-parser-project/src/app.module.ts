import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './email/email.controller';
import { MailParserService } from './email/email-parser.service';

@Module({
  imports: [],
  controllers: [AppController, EmailController],
  providers: [AppService, MailParserService],
})
export class AppModule {}
