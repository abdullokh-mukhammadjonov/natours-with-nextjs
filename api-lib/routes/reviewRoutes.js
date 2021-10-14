import tourRouter from 'api-lib/routes/tourRoutes';
import nc from 'next-connect';

const handler = nc();

handler.get((req, res) => res.end('juma vaqti'))

export default handler