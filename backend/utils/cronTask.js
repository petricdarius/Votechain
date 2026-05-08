const nodeCron = require("node-cron");
const Election = require("../models/electionModel");

nodeCron.schedule("0/10 * * * *", async function () {
  const now = new Date();
  console.log("rean");
  await Election.updateMany(
    {
      startDate: { $lte: now },
      endDate: { $gt: now },
      active: false,
      $expr: { $gte: [{ $size: "$candidates" }, 2] },
    },
    {
      $set: { active: true },
    },
  );

  await Election.updateMany(
    {
      endDate: { $lt: now },
      active: true,
    },
    { active: false },
  );
});
