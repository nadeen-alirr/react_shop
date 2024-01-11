import mongoose from "mongoose";

const reviewschema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true , default: 0 },
  comment: { type: String, required: true , default: 0 },
},
{timestamps:true}
);

const prouduct = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: false },
  reviews: [reviewschema],
  rating: { type: Number, required:true, default: 0 },
  countInStock: { type: Number, required:true, default: 0 },
},
{timestamps:true}
);

const Proudcts = mongoose.model("Products", prouduct);

export default Proudcts ;
