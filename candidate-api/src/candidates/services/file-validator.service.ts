import {
  BadRequestException,
  Injectable,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { FILE_CONFIG } from '../../common/constants';

const ALLOWED_MIME_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
] as const;

@Injectable()
export class FileValidatorService {
  validate(file: Express.Multer.File | undefined): void {
    if (!file) {
      throw new BadRequestException('Excel file is required');
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype as (typeof ALLOWED_MIME_TYPES)[number])) {
      throw new UnsupportedMediaTypeException(
        'Invalid file type. Only .xls/.xlsx allowed',
      );
    }

    if (file.size > FILE_CONFIG.MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of ${FILE_CONFIG.MAX_FILE_SIZE_MB}MB`,
      );
    }
  }
}
