const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// const getCollections = () => {
//   return collections;
// };

const connectMongo = async () => {
  return await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectMongo };
