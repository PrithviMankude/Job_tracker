import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

const start = async () => {
  try {
    console.log('In start');
    await connectDB(process.env.MONGO_URL);
    console.log('Connect to DB succesful');
    await Job.deleteMany();
    console.log('Deleting...');
    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );
    console.log('JSON parse successful');
    //console.log(jsonProducts);

    const resp = await Job.create(jsonProducts);
    console.log(resp);

    console.log('success n populating DB');
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log('Failed to populating DB');
    process.exit(1);
  }
};

start();
