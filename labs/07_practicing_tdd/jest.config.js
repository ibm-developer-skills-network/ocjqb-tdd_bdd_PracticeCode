module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!node_modules/**'
    ],
    testMatch: ['**/tests/**/*.test.js'],
    verbose: true,
    coverageReporters: [
        'text',
        'lcov',
        'html'
    ]
};
