const nodeCron = require("node-cron");
const Election = require("../models/electionModel");

nodeCron.schedule("* */5 * * * *", async function () {
  console.log("ran");
  const now = new Date();

  await Election.updateMany(
    {
      startDate: { $lte: now },
      endDate: { $gt: now },
      active: false,
      $expr: { $gte: [{ $size: "$candidates" }, 2] },
    },
    { active: true },
  );

  await Election.updateMany(
    {
      endDate: { $lt: now },
      active: true,
    },
    { active: false },
  );
});
