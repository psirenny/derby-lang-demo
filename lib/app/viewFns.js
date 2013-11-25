module.exports = function (app) {
  app.view.fn('link', function (href, text) {
    if (!href) return '';
    return '<a href="' + href + '">' + (text || href) + '</a>';
  });
};