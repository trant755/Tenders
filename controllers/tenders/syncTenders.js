const axios = require("axios");

const syncTenders = async (req, res, next) => {
  const { data } = await axios.get(
    "https://public.api.openprocurement.org/api/2.5/tenders?descending=1&limit=100"
  );
  console.log(data);
  const filteredTenders = [];

  const tendersId = data.data;

  for (let i = 0; i < tendersId.length; i++) {
    try {
      const { data: tender } = await axios.get(
        `https://public.api.openprocurement.org/api/2.5/tenders/${tendersId[i].id}`
      );
      console.log(i);
      if (tender.data.procuringEntity.address.region === "Київська область") {
        filteredTenders.push(tender.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).json({
    status: "success",
    code: 200,
    dataLength: filteredTenders.length,
    data: filteredTenders,
  });
};

module.exports = { syncTenders };
