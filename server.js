import { connect } from 'mongoose';
import { config } from 'dotenv';

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!! Shutting down');
  console.log(err.name, err.message);

  process.exit(1);
});

config({ path: './config.env' });
import app from './app.js';
import slugify from 'slugify';

const DB = process.env.DATABASE.replace('<db_password>', process.env.DB_PASSWORD);

connect(DB).then(con => {
  // console.log(con.connection);
  console.log('DB connection successful!');
});

// console.log(process.env);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port: ${port}...`);
  // console.log(process.env.NODE_ENV);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLER REJECTION!! Shutting down');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
