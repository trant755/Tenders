const express = require("express");
const tendersRouter = express.Router();

const { ctrlWrapper } = require("../middlewares");
const { syncTenders } = require("../controllers/tenders");

tendersRouter.get("/sync", ctrlWrapper(syncTenders));

module.exports = tendersRouter;
