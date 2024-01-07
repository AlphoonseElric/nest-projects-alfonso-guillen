"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailParserService = void 0;
const common_1 = require("@nestjs/common");
const mailparser_1 = require("mailparser");
let MailParserService = class MailParserService {
    async parseMail(fileContent) {
        try {
            const parsedEmail = await (0, mailparser_1.simpleParser)(fileContent);
            const jsonAttachment = parsedEmail.attachments.find((attachment) => attachment.contentType === 'application/json');
            if (jsonAttachment) {
                const jsonContent = JSON.parse(jsonAttachment.content.toString('utf-8'));
                return { data: jsonContent };
            }
            else {
                const jsonLink = parsedEmail.text.includes('json-link:')
                    ? parsedEmail.text.split('json-link:')[1].trim()
                    : null;
                if (jsonLink) {
                    const linkedJsonContent = await this.fetchJsonFromLink(jsonLink);
                    return { data: linkedJsonContent };
                }
                else {
                    return { message: 'No JSON found in the email.' };
                }
            }
        }
        catch (error) {
            return { error: 'Error parsing the email....' };
        }
    }
    async fetchJsonFromLink(link) {
        try {
            const response = await fetch(link);
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON from link. Status: ${response.status}`);
            }
            const jsonContent = await response.json();
            return jsonContent;
        }
        catch (error) {
            return { error: `Error fetching JSON from link: ${error.message}` };
        }
    }
};
exports.MailParserService = MailParserService;
exports.MailParserService = MailParserService = __decorate([
    (0, common_1.Injectable)()
], MailParserService);
//# sourceMappingURL=email-parser.service.js.map