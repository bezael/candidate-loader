import { FileValidatorService } from './file-validator.service';

describe('FileValidatorService', () => {
  let service: FileValidatorService;

  beforeEach(() => {
    service = new FileValidatorService();
  });

  describe('validate', () => {
    it('accept valid .xlsx file', () => {
      const validFile = {
        mimetype:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 1024,
      } as Express.Multer.File;

      expect(() => service.validate(validFile)).not.toThrow();
    });

    it('accept valid .xls file', () => {
      const validFile = {
        mimetype: 'application/vnd.ms-excel',
        size: 1024,
      } as Express.Multer.File;

      expect(() => service.validate(validFile)).not.toThrow();
    });
  });
});
