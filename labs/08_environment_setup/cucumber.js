module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/**/*.js'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    publishQuiet: true
  }
}
