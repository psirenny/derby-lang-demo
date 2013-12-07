module.exports = function (app) {
  app.ready(function (model) {
    model.on('change', '$locale.locale', function (locale) {
      var origin = model.get('$config.origin');
      $.post(origin + '/locale/session/change', {locale: locale});
    });
  });
};