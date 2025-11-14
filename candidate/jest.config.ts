import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@api/(.*)$': '<rootDir>/src/app/api/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
};

export default config;
