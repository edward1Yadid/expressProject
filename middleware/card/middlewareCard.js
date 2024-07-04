const { handleError } = require("../../utils/handleErrorsRequest");
const {
  getAllCards,
  getMyCards,
  getDetailCard,
  deletedCard,
  createCard,
  updateCard,
  userLikeCard,
  changeBizNumber,
} = require("../../models/card/CardDataManager");
const express = require("express");
const {
  validationServicesCreate,
  validationServicesUpdate,
} = require("../../validations/card/validationServices");
const { normalizedCard } = require("../../helpers/card/normalizedCard");
const { authorizationForAccsesUser } = require("../../authorization/user");
const { Card } = require("../../schemas/card/cardMongooseSchema");
const { default: mongoose } = require("mongoose");
const { generateBizNumber } = require("../../helpers/generateBizNumber");
const router = express.Router();

//FINISHED
router.get("/", async (request, response, next) => {
  try {
    const cards = await getAllCards();
    return response.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//FINISHED
router.get(
  "/my-cards",
  authorizationForAccsesUser,
  async (request, response) => {
    try {
      const userId = request.userAuthorization._id;
      const card = await getMyCards(userId);
      return response.send(card);
    } catch (error) {
      return handleError(request, error.status || 500, error.message);
    }
  }
);

//FINISHED
router.get("/:id", async (request, response, next) => {
  try {
    const { id: cardsID } = request.params;
    const card = await getDetailCard(cardsID);
    return response.send(card);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});
//FINISHED
router.post(
  "/",
  authorizationForAccsesUser,
  async (request, response, next) => {
    let cardFromClient = request.body;
    const userId = request.userAuthorization;

    try {
      const { isBusiness } = request.userAuthorization;
      if (!isBusiness) return handleError(response, 403, "Access denied");
      const { error } = validationServicesCreate(cardFromClient, userId._id);
      if (error) {
        return handleError(response, error.status || 500, error.message);
      }
      let card = await normalizedCard(cardFromClient, userId);
      card = await createCard(card)
      return response.status(201).send(card);
    } catch (error) {
      return handleError(response, error.status || 500, error.message);
    }
  }
);

//FINISHED
router.put(
  "/:id",
  authorizationForAccsesUser,
  async (request, response, next) => {
    try {
      const { id: cardID } = request.params;
      let cardFromClient = request.body;
      const { error } = validationServicesUpdate(cardFromClient);
      if (error) {
        return handleError(response, error.status || 500, error.message);
      }
      cardNormalized = await normalizedCard(cardFromClient);
      cardFromData = await updateCard(cardID, cardNormalized);
      return response.send(cardFromData);
    } catch (error) {
      return handleError(response, error.status || 500, error.message);
    }
  }
);
//FINISHED
router.patch(
  "/:id",
  authorizationForAccsesUser,
  async (request, response, next) => {
    try {
      const { _id: userId } = request.userAuthorization;
      const { id: cardID } = request.params;
      const card = await userLikeCard(cardID, userId);
      return response.send(card);
    } catch (error) {
      return handleError(response, error.status || 500, error.message);
    }
  }
);
//FINISHED
router.delete("/:id", authorizationForAccsesUser, async (request, response) => {
  try {
    const { _id: userId ,isAdmin} = request.userAuthorization;
    const { id: cardsID } = request.params;
 
    if( !isAdmin || userId ) {
      return handleError(response, 403, "Access denied")
    }
    const card = await deletedCard(cardsID);
    response.send(card);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});
//FINISHED BONUS CHANGE BIZNUMBER
router.patch(
  "/admin/:id",
  authorizationForAccsesUser,
  async (request, response) => {
    try {
      const {isAdmin}=request.userAuthorization
      if (!isAdmin) {
        return handleError(response, 403, "Access denied");
      }
      const { id: cardsID } = request.params;
      const adminBizNumberChange =await generateBizNumber()
    let card = await changeBizNumber(adminBizNumberChange,cardsID);
      return response.send(card);
    } catch (error) {
      return handleError(response, error.status || 500, error.message);
    }
  }
);

module.exports = router;
