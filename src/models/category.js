import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  note: { type: String, required: false }
});
const Category = mongoose.model("Categories", categorySchema);

export const CategoryRepository = Object.freeze({
  findById: async id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("The Id is not valid.");
    }
    return Category.findById(id);
  },
  findByName: async name => Category.findOne({ name }),
  getAll: async () => Category.find({}),
  create: async (name, note) => {
    const category = new Category({ name, note });
    return category.save();
  },
  update: async (id, update) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("The Id is not valid.");
    }
    const filter = { _id: id };
    return Category.findOneAndUpdate(filter, update, {
      new: true
    });
  },
  delete: async id => {
    return Category.findByIdAndDelete(id);
  }
});

export default Category;
