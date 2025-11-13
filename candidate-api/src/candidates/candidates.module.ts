import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CandidateDataParserService } from './services/candidate-data-parser.service';
import { ExcelReaderService } from './services/excel-reader.service';
import { FileValidatorService } from './services/file-validator.service';

@Module({
  controllers: [CandidatesController],
  providers: [
    CandidatesService,
    FileValidatorService,
    ExcelReaderService,
    CandidateDataParserService,
  ],
})
export class CandidatesModule {}
