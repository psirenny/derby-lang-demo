module.exports = function (app) {
  app.get('*', function (page, model, params, next) {
    model.start('$lang.locales', '$locale.supported', '$lang.translations');
    next();
  });

  app.get('/', function (page, model) {
    page.render('home');
  });

  app.get('/403', function (page) {
    page.render('403');
  });

  app.get('/404', function (page) {
    page.render('404');
  });

  app.get('/404', function (page) {
    page.render('404');
  });

  app.get('/500', function (page) {
    page.render('500');
  });
};