import mongoose from 'mongoose';
import config from '../../configs/database';

class Database {

  public connection;

  constructor() {
    this.connection = mongoose.connect(config.url);
  }
}

export default new Database();