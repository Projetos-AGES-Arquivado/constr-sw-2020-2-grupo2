
module.exports = () => {
  const app = express();

  require('../interface/routes')(app);

  return app;
};