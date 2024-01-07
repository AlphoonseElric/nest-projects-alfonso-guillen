import { Controller, Get, Param } from '@nestjs/common';
import { MailParserService } from './email-parser.service';
import * as fs from 'fs/promises'; // Import the fs module
import { EmailResponseDto } from './email.dto';
import axios from 'axios'; // Import axios for making HTTP requests

@Controller('mail')
export class EmailController {
  constructor(private readonly mailParserService: MailParserService) {}

  @Get('parse/:fileSource')
  async parseEmail(
    @Param('fileSource') fileSource: string,
  ): Promise<EmailResponseDto> {
    try {
      const fileContent = await this.getFileContent(fileSource);

      // Parse the email using the MailParserService
      const result = await this.mailParserService.parseMail(fileContent);

      // Return EmailResponseDto
      const responseDto: EmailResponseDto = {
        jsonContent: result /* your extracted JSON content */,
      };
      return responseDto;
    } catch (error) {
      console.error(`Error processing the email: ${error.message}`);
    }
  }

  private async getFileContent(fileSource: string): Promise<string> {
    try {
      // Check if the provided parameter is a URL
      if (this.isURL(fileSource)) {
        // If it's a URL, use axios for making the HTTP request
        const response = await axios.get(fileSource);
        return response.data;
      } else {
        // If it's a file path, read the file
        const emailFilePath = `./emails/${fileSource}.eml`;
        return await fs.readFile(emailFilePath, 'utf-8');
      }
    } catch (error) {
      console.log('__dirname:', __dirname);
      console.error(`Error reading file: ${error.message}`);
      return null;
    }
  }

  private isURL(str: string): boolean {
    // Simple check for URL format
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(str);
  }
}
