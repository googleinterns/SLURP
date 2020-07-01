module.exports = {
  testRegex: 'src(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['lib/', 'node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  rootDir: 'src'
}
