const  dataGeneratorServices= require("../services/data-generator.services");
const ERROR = require("../utils/ERRORS");
const { positive, negative } = require("../utils/responseTypes");

exports.dataGenerator = async (req, res) => {
  try {
    const result = await dataGeneratorServices.dataGenerator(req.body.data);
    res
      .status(201)
      .json(
        positive({data:result,message:"Data Store Successfully"})
      );
  } catch (error) {
    res
      .status(400)
      .json(negative({message:error.message || ERROR.WENTWRONG}));
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await dataGeneratorServices.findAll();
    res
      .status(201)
      .json(
        positive({data:result,message:""})
      );
  } catch (error) {
    res
      .status(400)
      .json(negative({message:error.message || ERROR.WENTWRONG}));
  }
};


exports.deleteData = async (req, res) => {
  try {
    const result = await dataGeneratorServices.deleteData(req.body.id);
    res
      .status(201)
      .json(
        positive({data:result,message:""})
      );
  } catch (error) {
    res
      .status(400)
      .json(negative({message:error.message || ERROR.WENTWRONG}));
  }
};