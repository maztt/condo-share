const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/condoshare')
  console.log('Connected to the database!')
}

main().catch(err => console.error(err))

module.exports = mongoose
