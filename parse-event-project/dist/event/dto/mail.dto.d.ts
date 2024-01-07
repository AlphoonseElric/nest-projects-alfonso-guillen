import { CommonHeadersDto } from './common-headers.dto';
export declare class MailDto {
    timestamp: string;
    source: string;
    messageId: string;
    destination: string[];
    commonHeaders: CommonHeadersDto;
}
