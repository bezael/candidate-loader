import {
  BadRequestException,
  Injectable,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

const ALLOWED_MIME_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

@Injectable()
export class FileValidatorService {
  validate(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('Excel file is required');
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeException(
        'Invalid file type. Only .xls/.xlsx allowed',
      );
    }
  }
}
