const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gradussus:123putinhuilo321@phonebook.kvavdxk.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connection successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { connectMongo };
