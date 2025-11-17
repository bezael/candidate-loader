import { IsNotEmpty, IsString } from 'class-validator';
import { CandidateSeniority } from '../types/candidate.types';

export class CreateCandidateDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString({ message: 'Surname must be a string' })
  @IsNotEmpty({ message: 'Surname is required' })
  surname!: string;
}

export class CandidateResponseDto {
  name!: string;
  surname!: string;
  seniority!: CandidateSeniority;
  years!: number;
  availability!: boolean;
}
