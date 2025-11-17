import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_CONFIG } from '../common/constants';
import { CandidatesService } from './candidates.service';
import { CandidateResponseDto, CreateCandidateDto } from './dto/candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: FILE_CONFIG.MAX_FILE_SIZE_BYTES },
    }),
  )
  uploadCandidate(
    @Body() body: CreateCandidateDto,
    @UploadedFile() file: any,
  ): CandidateResponseDto {
    const { name, surname } = body;
    return this.candidatesService.processCandidate(name, surname, file);
  }
}
