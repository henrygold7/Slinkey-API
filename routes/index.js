const routes = require('./controllers');
module.exports = function(app, db) {
  routes(app, db);
  // Other route groups could go here, in the future
};