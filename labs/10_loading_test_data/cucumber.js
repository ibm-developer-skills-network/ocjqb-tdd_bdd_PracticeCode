module.exports = {
  default: {
    require: ['features/step_definitions/*.js', 'features/support/*.js'],
    format: ['progress'],
    paths: ['features/*.feature']
  }
};
