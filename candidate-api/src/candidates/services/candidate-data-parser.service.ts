import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CandidateDataParserService {
  parseSeniority(raw: unknown): 'junior' | 'senior' {
    if (raw !== 'junior' && raw !== 'senior') {
      throw new BadRequestException(
        "Column 'seniority' must be 'junior' or 'senior'",
      );
    }
    return raw;
  }

  parseYears(raw: unknown): number {
    if (typeof raw !== 'number' || Number.isNaN(raw)) {
      throw new BadRequestException("Column 'years' must be a number");
    }
    return raw;
  }

  parseAvailability(raw: unknown): boolean {
    if (typeof raw === 'boolean') return raw;

    if (typeof raw === 'string') {
      const mapping: Record<string, boolean> = {
        true: true,
        '1': true,
        yes: true,
        y: true,
        false: false,
        '0': false,
        no: false,
        n: false,
      };

      if (raw in mapping) {
        return mapping[raw];
      }
    }

    throw new BadRequestException(
      "Column 'availability' must be boolean-like (true/false)",
    );
  }
}
