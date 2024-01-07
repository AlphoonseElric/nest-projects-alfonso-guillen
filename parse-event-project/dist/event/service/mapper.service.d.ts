import { EventDto } from '../dto/event.dto';
export declare class MapperService {
    mapJsonToEventDto(json: any): EventDto;
    private validateDto;
    private buildErrorMessage;
}
