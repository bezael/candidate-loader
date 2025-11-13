import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from './candidates.service';
import { CandidateResponseDto, CreateCandidateDto } from './dto/candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
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
