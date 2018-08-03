const controllers = require('./controllers');


module.exports = app => {
  app.post('/str', controllers.str);
  app.post('/api', controllers.api);
};
