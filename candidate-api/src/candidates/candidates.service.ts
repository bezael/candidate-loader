import { Injectable, Logger } from '@nestjs/common';
import { EXCEL_COLUMNS } from '../common/constants';
import { CandidateResponseDto } from './dto/candidate.dto';
import { CandidateDataParserService } from './services/candidate-data-parser.service';
import { ExcelReaderService } from './services/excel-reader.service';
import { FileValidatorService } from './services/file-validator.service';

@Injectable()
export class CandidatesService {
  private readonly logger = new Logger(CandidatesService.name);

  constructor(
    private readonly fileValidator: FileValidatorService,
    private readonly excelReader: ExcelReaderService,
    private readonly dataParser: CandidateDataParserService,
  ) {}

  processCandidate(
    name: string,
    surname: string,
    file: Express.Multer.File | undefined,
  ): CandidateResponseDto {
    this.fileValidator.validate(file);

    this.logger.debug(`Processing candidate Excel for ${name}`);

    const row = this.excelReader.readFirstRow(file!);

    const seniorityRaw = row[EXCEL_COLUMNS.SENIORITY];
    const seniority = this.dataParser.parseSeniority(
      typeof seniorityRaw === 'string' ? seniorityRaw.toLowerCase().trim() : seniorityRaw,
    );
    
    const years = this.dataParser.parseYears(row[EXCEL_COLUMNS.YEARS]);
    
    const availabilityRaw = row[EXCEL_COLUMNS.AVAILABILITY];
    const availability = this.dataParser.parseAvailability(
      typeof availabilityRaw === 'string' ? availabilityRaw.toLowerCase().trim() : availabilityRaw,
    );

    return {
      name,
      surname,
      seniority,
      years,
      availability,
    };
  }
}
