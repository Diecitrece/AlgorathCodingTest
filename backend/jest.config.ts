import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  verbose: true,
  roots: ['src'],
  moduleNameMapper: {
    '^@ports/(.*)$': '<rootDir>/src/core/application/ports/$1',
    '^@use-cases/(.*)$': '<rootDir>/src/core/application/use_cases/$1',
    '^@domain/(.*)$': '<rootDir>/src/core/domain/$1',
    '^@shared/(.*)$': '<rootDir>/src/infrastructure/shared/$1',
    '^@input_infrastructure/(.*)$': '<rootDir>/src/infrastructure/input/$1',
    '^@output_infrastructure/(.*)$': '<rootDir>/src/infrastructure/output/$1',
  },
};
export default config;
