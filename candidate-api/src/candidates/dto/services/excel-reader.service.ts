import { BadRequestException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelReaderService {
  readFirstRow(file: Express.Multer.File): Record<string, unknown> {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: null,
    });

    if (!rows.length) {
      throw new BadRequestException('Excel file has no data rows');
    }

    return rows[0];
  }
}
