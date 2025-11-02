import { readFileSync } from 'fs';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Tour from './../../models/tourModel.js';
import User from './../../models/userModel.js';
import Review from './../../models/reviewModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace('<db_password>', process.env.DB_PASSWORD);

connect(DB).then(con => {
  console.log('DB connection successful!');
});

const tours = JSON.parse(readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data Successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
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
