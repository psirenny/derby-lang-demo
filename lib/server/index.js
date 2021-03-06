var app = require('../app')
  , client = require('./client')
  , config = require('./config')
  , derby = require('derby')
  , error = require('./error')
  , express = require('express')
  , expressApp = module.exports = express()
  , lang = require('derby-lang').server()
  , langFs = require('derby-lang-fs')
  , langLocale = require('derby-lang-locale')
  , liveDbMongo = require('livedb-mongo')
  , locale = require('derby-locale')
  , localeBrowser = require('derby-locale-browser')
  , localeSession = require('derby-locale-session')(expressApp)
  , MongoStore = require('connect-mongo')(express)
  , racerBrowserChannel = require('racer-browserchannel')
  , Redis = require('redis');

var redis = Redis.createClient(config.get('redis.port'), config.get('redis.hostname'), config.get('redis.options'));
redis.select(config.get('redis.index'));

var store = derby.createStore({
  db: {db: liveDbMongo(config.get('mongo.url') + '?auto_reconnect', config.get('mongo.options')), redis: redis}
});

expressApp
  .use(express.compress())
  .use(app.scripts(store))
  .use(express.static(__dirname + '/../../public'))
  .use(express.cookieParser())
  .use(express.session({
    secret: config.get('secretKey'),
    store: new MongoStore({
      safe: config.get('mongo.options.safe'),
      url: config.get('mongo.url')
    })
  }))
  .use(racerBrowserChannel(store))
  .use(store.modelMiddleware())
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(lang.init())
  .use(langFs())
  .use(lang.build())
  .use(langLocale())
  .use(localeSession.init())
  .use(localeBrowser())
  .use(locale())
  .use(client())
  .use(app.router())
  .use(expressApp.router)
  .use(localeSession.routes())
  .use(error(expressApp));