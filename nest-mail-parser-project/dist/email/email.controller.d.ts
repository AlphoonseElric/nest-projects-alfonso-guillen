import { MailParserService } from './email-parser.service';
import { EmailResponseDto } from './email.dto';
export declare class EmailController {
    private readonly mailParserService;
    constructor(mailParserService: MailParserService);
    parseEmail(fileSource: string): Promise<EmailResponseDto>;
    private getFileContent;
    private isURL;
}
