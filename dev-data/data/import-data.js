const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const importTours = async () => {
  try {
    await Tour.create(tours);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteTours = async () => {
  try {
    await Tour.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importTours();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}
