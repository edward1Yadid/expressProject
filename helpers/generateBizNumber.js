const { Card } = require("../schemas/card/cardMongooseSchema");
const lodash = require("lodash");
const {handleBadRequest} = require("../utils/handleErrorsRequest");

const generateBizNumber = async () => {
  try {
    const random = lodash.random(1000000, 9000000);
    const card = await Card.findOne({ bizNumber: random });
    if (card) {
      return generateBizNumber();
    }
    return random;
  } catch (error) {
    return handleBadRequest("GenerateBizNumber", error.message);
  }
};

exports.generateBizNumber=generateBizNumber

