/* This is a JavaScript code that defines a Mongoose schema for a user object with properties such as
name, email, password, and id. It exports a Mongoose model for the user schema, which can be used to
interact with a MongoDB database. The `import mongoose from "mongoose"` statement imports the
Mongoose library, which is a popular Node.js library for MongoDB object modeling. */

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String }
});

export default mongoose.model("User", userSchema);