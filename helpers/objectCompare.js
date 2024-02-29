const _ = require("lodash");

const obj1 = {
  property1: "value1",
  property2: "value2",
  property3: {
    property1: "value1",
    property2: "value2",
    property3: "value--------",
  },
};
const obj2 = {
  property1: "value1",
  property2: "value2",
  property3: {
    property1: "value1",
    property2: "value2",
    property3: "value**********",
  },
};

const objectCompare = (obj1, obj2) => {
  console.log("--- objectCompare");

  try {
    console.log(_.isEqual(obj1, obj2));
  } catch (error) {
    console.log(`---error: ${error}`);
  }
};

// виклик функції
// objectCompare(obj1, obj2);

module.exports = { objectCompare };
