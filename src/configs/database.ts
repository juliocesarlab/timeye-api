import 'dotenv/config';

const config = {
  url: process.env.MONGO_DB_CONN_STRING as string
}

export default config