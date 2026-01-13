const cron = require("node-cron");
const {
  removeExpiredStoriesDB,
  removeExpiredOffersDB,
} = require("../services/userService");

const deleteExpiredStories = () => {
  cron.schedule("0 * * * *", () => {
    removeExpiredStoriesDB();
  });
};

const deleteExpiredOffers = () => {
  cron.schedule("0 * * * *", () => {
    removeExpiredOffersDB();
  });
};

module.exports = {
  deleteExpiredStories,
  deleteExpiredOffers,
};
