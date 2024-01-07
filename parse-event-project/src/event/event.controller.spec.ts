// src/event/event.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { MapperService } from '../event/service/mapper.service';
import { EventDto } from './dto/event.dto';

jest.mock('../event/service/mapper.service'); // Mock the MapperService

describe('EventController', () => {
  let controller: EventController;
  let mapperService: MapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [MapperService],
    }).compile();

    controller = module.get<EventController>(EventController);
    mapperService = module.get<MapperService>(MapperService);
  });

  describe('processEvent', () => {
    it('should process the event and return the formatted response', () => {
      // Arrange
      const mockJson = {}; // Add your mock JSON data here
      const mockEventDto: EventDto = {} as EventDto; // Add your mock EventDto data here

      // Mock the mapJsonToEventDto method of the MapperService
      jest
        .spyOn(mapperService, 'mapJsonToEventDto')
        .mockReturnValueOnce(mockEventDto);

      // Mock the processEventDto method of the controller
      jest
        .spyOn(controller as any, 'processEventDto')
        .mockReturnValueOnce('formattedResponse');

      // Mock the formatResponse method of the controller
      jest
        .spyOn(controller as any, 'formatResponse')
        .mockReturnValueOnce('formattedResponse');

      // Act
      const result = controller.processEvent(mockJson);

      // Assert
      expect(result).toBe('formattedResponse');
    });
  });
});
