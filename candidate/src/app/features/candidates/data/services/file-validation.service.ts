import { Injectable } from '@angular/core';
import { FileValidationConfig, FileValidationResult } from '@app/features/candidates/data/interfaces/file-validation.interface';


@Injectable({ providedIn: 'root' })
export class FileValidationService {
  private readonly defaultConfig: FileValidationConfig = {
    allowedExtensions: ['.xlsx', '.xls'],
    maxSizeInMB: 5,
  };

 
  validateFile(file: File, config?: Partial<FileValidationConfig>): FileValidationResult {
    const validationConfig = { ...this.defaultConfig, ...config };


    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validationConfig.allowedExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        error: `Please select a valid file with extensions: ${validationConfig.allowedExtensions.join(
          ', '
        )}`,
      };
    }

    if (validationConfig.maxSizeInMB) {
      const maxSizeInBytes = validationConfig.maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return {
          isValid: false,
          error: `File size must be less than ${validationConfig.maxSizeInMB}MB`,
        };
      }
    }

    return { isValid: true };
  }


  getFileExtension(fileName: string): string {
    return '.' + fileName.split('.').pop()?.toLowerCase();
  }
}
