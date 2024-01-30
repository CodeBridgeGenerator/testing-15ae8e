const { Relation } = require('./relation.class');
const createModel = require('../../models/relation.model');
const hooks = require('./relation.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/relation', new Relation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('relation');

  service.hooks(hooks);
};