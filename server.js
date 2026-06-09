require('dotenv').config();
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('🚀 ~ UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log('🚀 ~ err:', err.name, err.message);
  console.log(err);

  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(_ => console.log('🚀 ~ connected to DB successfully'))
  .catch(err => console.error('🚀 ~ connected to Database ~ error:', err));

const port = process.env.PORT || 8000;
const server = app.listen(port, _ => {
  console.log(`🚀 ~ App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('🚀 ~ UNHANDLED REJECTION!: Shutting down...');
  console.log('🚀 ~ err:', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
