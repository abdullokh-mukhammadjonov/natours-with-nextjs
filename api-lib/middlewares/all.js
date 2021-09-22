import { ncOpts } from 'api-lib/utils/nextOptions';
import nc from 'next-connect';

// import database from './database';
// import { databaseMongoose } from './mongodb_mongoose';

export default function base() {
  // return nc(ncOpts).use(middleware);
  return nc(ncOpts);
}
