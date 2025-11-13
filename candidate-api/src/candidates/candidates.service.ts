import { Injectable, Logger } from '@nestjs/common';
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
    file: Express.Multer.File,
  ): CandidateResponseDto {
    this.fileValidator.validate(file);

    this.logger.debug(`Processing candidate Excel for ${name}`);

    const row = this.excelReader.readFirstRow(file);

    const seniority = this.dataParser.parseSeniority(
      (row['seniority'] as string)?.toLowerCase().trim(),
    );
    const years = this.dataParser.parseYears(row['years']);
    const availability = this.dataParser.parseAvailability(
      (row['availability'] as string)?.toLowerCase().trim(),
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
