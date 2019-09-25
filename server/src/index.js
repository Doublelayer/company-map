const app = require('./app');
const db = require('./database');

const port = process.env.PORT || 5000;

db.connect(() => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
});
