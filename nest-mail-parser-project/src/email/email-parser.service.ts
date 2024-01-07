// src/mail/mail-parser.service.ts

import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
//import * as fs from 'fs/promises';

@Injectable()
export class MailParserService {
  async parseMail(fileContent: string): Promise<any> {
    try {
      // Parse the email using mailparser
      const parsedEmail = await simpleParser(fileContent);

      // Check for JSON attachment
      const jsonAttachment = parsedEmail.attachments.find(
        (attachment) => attachment.contentType === 'application/json',
      );

      if (jsonAttachment) {
        // JSON is attached as a file
        const jsonContent = JSON.parse(
          jsonAttachment.content.toString('utf-8'),
        );
        return { data: jsonContent };
      } else {
        // Check for JSON link in the email body
        const jsonLink = parsedEmail.text.includes('json-link:')
          ? parsedEmail.text.split('json-link:')[1].trim()
          : null;

        if (jsonLink) {
          // JSON is linked in the email body
          const linkedJsonContent = await this.fetchJsonFromLink(jsonLink);
          return { data: linkedJsonContent };
        } else {
          // No JSON found
          return { message: 'No JSON found in the email.' };
        }
      }
    } catch (error) {
      return { error: 'Error parsing the email....' };
    }
  }

  private async fetchJsonFromLink(link: string): Promise<any> {
    try {
      const response = await fetch(link);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch JSON from link. Status: ${response.status}`,
        );
      }

      const jsonContent = await response.json();
      return jsonContent;
    } catch (error) {
      return { error: `Error fetching JSON from link: ${error.message}` };
    }
  }
}
