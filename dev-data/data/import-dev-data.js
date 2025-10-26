const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel').default;

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace('<db_password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(con => {
  console.log('DB connection successful!');
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
