const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('connections are successful!'));

const port = process.env.PORT || 3000;
const host = '127.0.0.1';
app.listen(port, host, () => {
  console.log(`from port: ${port}...`);
});
