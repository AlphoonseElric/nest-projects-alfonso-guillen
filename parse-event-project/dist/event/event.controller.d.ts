import { MapperService } from '../event/service/mapper.service';
export declare class EventController {
    private readonly mapperService;
    constructor(mapperService: MapperService);
    processEvent(json: any): any;
    private processEventDto;
    private formatTimestampToMonth;
    private extractUsernameFromEmail;
    private formatResponse;
}
