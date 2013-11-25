module.exports = function (app) {
  app.ready(function (model) {
    model.on('change', '_session.locale', function (locale) {
      var origin = model.get('$config.origin');
      $.post(origin + '/language/changeLocale', {locale: locale});
    });
  });
}