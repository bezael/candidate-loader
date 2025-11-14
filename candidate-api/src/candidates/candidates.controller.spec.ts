import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CandidateDataParserService } from './services/candidate-data-parser.service';
import { ExcelReaderService } from './services/excel-reader.service';
import { FileValidatorService } from './services/file-validator.service';

describe('CandidatesController', () => {
  let controller: CandidatesController;


  const mockFileValidator = {
    validate: jest.fn(),
  };

  const mockExcelReader = {
    readFirstRow: jest.fn(),
  };

  const mockDataParser = {
    parseSeniority: jest.fn(),
    parseYears: jest.fn(),
    parseAvailability: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        CandidatesService,
        {
          provide: FileValidatorService,
          useValue: mockFileValidator,
        },
        {
          provide: ExcelReaderService,
          useValue: mockExcelReader,
        },
        {
          provide: CandidateDataParserService,
          useValue: mockDataParser,
        },
      ],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
    
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadCandidate', () => {
    it('process correctly when a file is uploaded and the required fields are present', () => {

      const body = {
        name: 'Juan',
        surname: 'Pérez',
      };
      const mockFile = {
        buffer: Buffer.from('mock file content'),
        mimetype:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        originalname: 'test.xlsx',
        size: 1024,
      } as Express.Multer.File;

      const mockRow = {
        seniority: 'senior',
        years: 5,
        availability: 'yes',
      };

      mockFileValidator.validate.mockReturnValue(undefined);
      mockExcelReader.readFirstRow.mockReturnValue(mockRow);
      mockDataParser.parseSeniority.mockReturnValue('senior');
      mockDataParser.parseYears.mockReturnValue(5);
      mockDataParser.parseAvailability.mockReturnValue(true);


      const result = controller.uploadCandidate(body, mockFile);


      expect(result).toEqual({
        name: 'Juan',
        surname: 'Pérez',
        seniority: 'senior',
        years: 5,
        availability: true,
      });

      expect(mockFileValidator.validate).toHaveBeenCalledWith(mockFile);
      expect(mockExcelReader.readFirstRow).toHaveBeenCalledWith(mockFile);
      expect(mockDataParser.parseSeniority).toHaveBeenCalledWith('senior');
      expect(mockDataParser.parseYears).toHaveBeenCalledWith(5);
      expect(mockDataParser.parseAvailability).toHaveBeenCalledWith('yes');
    });

    it('throw BadRequestException when no file is uploaded', () => {

      const body = {
        name: 'Juan',
        surname: 'Pérez',
      };
      const mockFile = null;

      mockFileValidator.validate.mockImplementation(() => {
        throw new BadRequestException('Excel file is required');
      });


      expect(() => {
        controller.uploadCandidate(body, mockFile);
      }).toThrow(BadRequestException);

      expect(() => {
        controller.uploadCandidate(body, mockFile);
      }).toThrow('Excel file is required');

      expect(mockFileValidator.validate).toHaveBeenCalledWith(null);
      expect(mockExcelReader.readFirstRow).not.toHaveBeenCalled();
    });
  });
});
