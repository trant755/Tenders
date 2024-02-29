const _ = require("lodash");
const fs = require("fs").promises;
const path = require("path");

// взірці об’єктів
const json1Path = path.join(process.cwd(), "json", "object1.json");
const json2Path = path.join(process.cwd(), "json", "object2.json");

const obj1 = {
  property1: "value01",
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
    property2: "value2.1",
    property3: "value**********",
  },
};

// масив різниць в об’єктах
const diff = (obj1, obj2, path = "") => {
  let differences = [];

  Object.keys(obj1).forEach((key) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (!_.has(obj2, key)) {
      differences.push(`${currentPath} відсутнє в другому об’єкті`);
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      differences = differences.concat(diff(obj1[key], obj2[key], currentPath));
    } else if (!_.isEqual(obj1[key], obj2[key])) {
      differences.push(
        `${currentPath} відрізняється (${obj1[key]} від ${obj2[key]})`
      );
    }
  });

  Object.keys(obj2).forEach((key) => {
    const currentPath = path ? `${path}.${key}` : key;
    if (!_.has(obj1, key)) {
      differences.push(`${currentPath} відсутнє в першому об’єкті`);
    }
  });
  return differences;
};

// порівняння об’єктів
const objectCompare = (obj1, obj2) => {
  const differences = diff(obj1, obj2);

  if (differences.length > 0) {
    console.log("********* Тендери відрізняються:");
    differences.forEach((difference) => console.log(difference));
  } else {
    console.log("********* Тендери однакові *********");
  }
};

// порівняння з файлів
async function compareJsonFiles(json1Path, json2Path) {
  try {
    const data1 = JSON.parse(
      await fs.readFile(json1Path, "utf-8", function (err, data) {
        if (err) console.log(`err 1: ${err}`);

        console.log(11111);
      })
    );

    const data2 = JSON.parse(
      await fs.readFile(json2Path, "utf-8", function (err, data) {
        if (err) console.log(`err 2: ${err}`);

        console.log(22222);
      })
    );

    objectCompare(data1, data2);
  } catch (error) {
    console.error("Error reading files:", error);
  }
}

// виклик функції 1
objectCompare(obj1, obj2);

// виклик асинхронно з файлів джейсон
compareJsonFiles(json1Path, json2Path);

module.exports = { objectCompare };
