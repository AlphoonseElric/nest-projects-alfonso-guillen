import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { MailParserService } from './email-parser.service';
import { EmailResponseDto } from './email.dto';

describe('EmailController', () => {
  let emailController: EmailController;
  let mailParserService: MailParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [MailParserService],
    }).compile();

    emailController = module.get<EmailController>(EmailController);
    mailParserService = module.get<MailParserService>(MailParserService);
  });

  describe('parseEmail', () => {
    it('should return an EmailResponseDto with parsed content', async () => {
      // Mock the MailParserService
      const mockParsedResult = {
        /* your mocked result */
      };
      jest
        .spyOn(mailParserService, 'parseMail')
        .mockResolvedValue(mockParsedResult);

      // Mock the getFileContent method
      jest
        .spyOn(emailController as any, 'getFileContent')
        .mockResolvedValue('mocked file content');

      // Execute the parseEmail method
      const fileSource = 'example.eml';
      const result: EmailResponseDto =
        await emailController.parseEmail(fileSource);

      // Assertions
      expect(result).toEqual({ jsonContent: mockParsedResult });
      // Add more assertions if needed
    });

    it('should handle errors and log them', async () => {
      // Mock the getFileContent method to throw an error
      jest
        .spyOn(emailController as any, 'getFileContent')
        .mockRejectedValue(new Error('File read error'));

      // Spy on console.error to check if it's called
      const consoleErrorSpy = jest.spyOn(console, 'error');

      // Execute the parseEmail method
      const fileSource = 'example.eml';
      await emailController.parseEmail(fileSource);

      // Assertions
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error processing the email'),
      );
      // Add more assertions if needed
    });
  });
});
