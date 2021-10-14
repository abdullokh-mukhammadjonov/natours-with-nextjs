import { ncOpts } from 'api-lib/utils/nextOptions';
import nc from 'next-connect';
import morgan from 'morgan'

import database from 'api-lib/database/db_mongoose';
// import { databaseMongoose } from './mongodb_mongoose';

export default function base(additionalOptions) {
  let options = {
    ...ncOpts,
    ...additionalOptions
  }
  return nc(options).use(morgan('dev'))
}
//.use(async(req, res, next) => { await database(); next() })