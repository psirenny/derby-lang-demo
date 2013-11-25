var app = require('derby')
  .createApp(module)
  .use(require('../../ui'))
  .use(require('derby-ui-github-buttons'));

require('derby-lang').app(app);
require('./events')(app);
require('./routes')(app);
require('./viewFns')(app);