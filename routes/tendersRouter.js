const express = require("express");
const tendersRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { addEmployerToList } = require("../../controllers/employer");

tendersRouter.post("/tenders/sync", ctrlWrapper(syncTenders));

module.exports = tendersRouter;
