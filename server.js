require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Vigilantly listening on PORT ${PORT}`);
});
