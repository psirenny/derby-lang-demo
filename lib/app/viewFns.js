module.exports = function (app) {
  app.view.fn('concat', function (s1, s2) {
    return s1 + s2;
  });

  app.view.fn('link', function (href, text) {
    if (!href) return '';
    return '<a href="' + href + '">' + (text || href) + '</a>';
  });
};