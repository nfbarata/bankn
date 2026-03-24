module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
};
