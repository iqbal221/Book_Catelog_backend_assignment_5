import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database connected successfully`);

    app.listen(config.port, () => {
      console.log(`Application is running on port ${config.port}`);
    });
  } catch (error) {
    console.log('Fail to connect to Database');
  }
}

main();
