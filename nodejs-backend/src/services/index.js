const users = require("./users/users.service.js");
const laravelJson = require("./laravelJson/laravelJson.service.js");
const relation = require("./relation/relation.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(laravelJson);
  app.configure(relation);
    // ~cb-add-configure-service-name~
};
