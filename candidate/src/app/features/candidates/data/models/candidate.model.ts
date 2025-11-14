type Seniority = 'senior' | 'junior';

interface CandidateBase {
  name: string;
  surname: string;
}

interface CandidateFile {
  file: File;
}

export interface Candidate extends CandidateBase, CandidateFile {}

export interface CandidateResponse extends CandidateBase {
  seniority: Seniority;
  years: number;
  availability: boolean;
}
