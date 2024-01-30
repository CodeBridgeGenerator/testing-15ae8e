const { LaravelJson } = require('./laravelJson.class');
const createModel = require('../../models/laravelJson.model');
const hooks = require('./laravelJson.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/laravelJson', new LaravelJson(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('laravelJson');

  service.hooks(hooks);
};