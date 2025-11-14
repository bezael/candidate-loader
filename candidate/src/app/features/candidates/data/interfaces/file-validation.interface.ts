
export interface FileValidationConfig {
  allowedExtensions: string[];
  maxSizeInMB?: number;
}


export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}
