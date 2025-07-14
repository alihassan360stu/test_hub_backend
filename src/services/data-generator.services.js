const dataGenerator = require("../models/data-generator.model");
exports.dataGenerator = async (data) => {
  await dataGenerator.create({ data: data });
  return { data: JSON.parse(data) };
};

exports.findAll = async () => {
  const data = await dataGenerator.find();
  return data;
};

exports.deleteData = async (id) => {
  const data = await dataGenerator.find();
  let find_id = "";

  data.map((item) => {
    if (JSON.parse(item.data).id == id) {
      find_id = item._id;
    }
  });

  let is_delete = await dataGenerator.deleteOne({ _id: find_id });

  if (is_delete?.deletedCount > 0) {
    return is_delete;
  } else {
    throw new Error(ERROR.WENTWRONG);
  }
};
