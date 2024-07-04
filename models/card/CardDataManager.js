const chalk = require("chalk");
const { Card } = require("../../schemas/card/cardMongooseSchema");
const config = require("config");
const DB = config.get("DB");
const { handleBadRequest } = require("../../utils/handleErrorsRequest");

const getAllCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.statues = 404;
      console.log(error);
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    return Promise.resolve("cards dont found in the database");
  }
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let cards = await Card.find({ user_id: { $eq: userId } });
      if (!cards) {
        console.log(chalk.bgBlue("Could not find yours cards in the database"));
      }
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in mongodb");
};

const getDetailCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const cards = Card.findById({ _id: cardId });
      if (!cards || cards.length === 0) {
        throw new Error("Could not find any card in the database");
      }
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  } else {
    return Promise.resolve([]);
  }
};

const createCard = async (normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(normalizedCard);
      card = await card.save();
     return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  } else {
    return Promise.resolve([]);
  }
};

const updateCard = async (id, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findByIdAndUpdate(id, normalizedCard, {
        new: true,
      });
      if (!card) {
        console.log(
          chalk.bgBlue(
            "Could not update this card because a card with this ID cannot be found in the database"
          )
        );
      }
      return Promise.resolve(card);
    } catch (error) {
      error.statues = 404;
      return handleBadRequest("Mongoose", error);
    }
  } else {
    return Promise.resolve("card dosen't updated!");
  }
};
const deletedCard = async (id) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findByIdAndDelete(id);
      if (!card) {
        console.log(
          chalk.bgBlue(
            "Could not delete this card because a card with this ID cannot be found in the database"
          )
        );
      }
      return Promise.resolve(card);
    } catch (error) {
      error.statues = 404;
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    return Promise.resolve("card deleted not in mongodb!");
  }
};
const userLikeCard = async (cardID, userId) => {
  if (DB === "MONGODB") {
    try {
  
      let card = await Card.findById(cardID);

      if (!card) {
        throw new Error("A card with this ID cannot be found in the database");
      }
      const likedCard = card.likes.find((id) => id === userId);
    
      if (!likedCard) {
        card.likes.push(userId);
        card = await card.save();
        return Promise.resolve(card);
      } else {
        const likedCard = card.likes.filter((id) => id !== userId);
        card.likes = likedCard;
        card = await card.save();
        return Promise.resolve(card);
      }
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    return Promise.resolve("card liked not in mongodb!");
  }
};
const changeBizNumber = async (adminBizNumberChange, cardsID) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardsID);
      if (!card) {
        return null;
      }
      const { bizNumber } = card;
      if (adminBizNumberChange === bizNumber) {
        return null;
      } else {
        card.bizNumber = adminBizNumberChange;
        card = await card.save();
        return card;
      }
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    return Promise.resolve("card biznumber not in mongodb!");
  }
};


module.exports = {
  getAllCards,
  getMyCards,
  getDetailCard,
  updateCard,
  deletedCard,
  createCard,
  userLikeCard,
  changeBizNumber,
};
