export const SERVER_CONFIG = {
  DEFAULT_PORT: 3000,
} as const;

export const FILE_CONFIG = {
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024,
  MAX_FILE_SIZE_MB: 5,
} as const;

export const EXCEL_CONFIG = {
  FIRST_SHEET_INDEX: 0,
  FIRST_ROW_INDEX: 0,
} as const;

export const CORS_CONFIG = {
  DEFAULT_ALLOWED_ORIGINS: ['http://localhost:4200'],
} as const;


export const EXCEL_COLUMNS = {
  SENIORITY: 'seniority',
  YEARS: 'years',
  AVAILABILITY: 'availability',
} as const;

