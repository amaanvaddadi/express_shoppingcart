require('dotenv').config();

function mongoUri() {

  return process.env.MONGODB_URI;
}

module.exports ={
mongoUri
}
