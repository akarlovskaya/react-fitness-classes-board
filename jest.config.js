export default {
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': ['babel-jest']
    },
    moduleFileExtensions: ['js', 'jsx'],
    extensionsToTreatAsEsm: ['.jsx']  // Only include .jsx since .js is already handled by type: module
  };
  