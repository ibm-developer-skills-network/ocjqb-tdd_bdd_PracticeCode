module.exports = {
  default: {
      require: [
          'features/support/**/*.js',
          'features/step_definitions/**/*.js'
      ],
      format: [
          'progress-bar',
          'json:reports/cucumber_report.json'
      ],
      paths: [
          'features/*.feature'
      ],
      parallel: 1,
      timeout: 60000
  }
};