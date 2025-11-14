import { TestBed } from '@angular/core/testing';
import { FileValidationService } from './file-validation.service';

describe('FileValidationService', () => {
  let service: FileValidationService;

  beforeEach(() => {
    service = TestBed.inject(FileValidationService);
  });

  describe('validateFile', () => {
    it('return valid when the file has allowed extension and size is correct', () => {
      const file = new File(['contenido'], 'archivo.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      Object.defineProperty(file, 'size', { value: 2 * 1024 * 1024 }); // 2MB

      const result = service.validateFile(file);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('invalid when the file has not allowed extension', () => {
      const file = new File(['contenido'], 'archivo.pdf', { type: 'application/pdf' });
      Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 }); // 1MB

      const result = service.validateFile(file);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Please select a valid file with extensions');
    });

  });
});

