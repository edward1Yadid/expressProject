const express = require("express");
const {
  handleError,
  handleErrorOfVlidation,
} = require("../../utils/handleErrorsRequest");
const {
  getUsers,
  getUser,
  deleteUser,
  loginUser,
  registerUser,
  userEdited,
  ChangeIsBusinessStatus,
} = require("../../models/user/UserDataManager");
const {
  validateLogin,
  validateRestration,
  userUpdaevalidation,
} = require("../../validations/user/validationServices");
const normalizedUser = require("../../helpers/user/normalizedUser");
const {
  generatePassword,
} = require("../../authorization/password/generatePassword");
const { authorizationForAccsesUser } = require("../../authorization/user");

const router = express.Router();
///finished
router.post("/", async (request, response) => {
  try {
    let user = request.body;

    const { error } = validateRestration(user);
    console.log(error);
    if (error) {
      return handleError(response, error.status || 500, error.message);
    }
    userNormalized = normalizedUser(user);
    const { password } = userNormalized;
    const hashPassword = await generatePassword(password);
    user = await registerUser({ ...userNormalized, password: hashPassword });
    return response.status(201).send(user);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});
///finished
router.post("/login", async (request, response) => {
  try {
    let user = request.body;
    const { error } = validateLogin(user);
    if (error) return handleError(response, 400, error.details[0].message);
  
    user = await loginUser(user);
    return response.send(user);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});
///finished
router.get("/", authorizationForAccsesUser, async (request, response) => {

  try {
    const { isAdmin } = request.userAuthorization;

    if (!isAdmin) {
      return handleError(response, 403, "Access denied");
    }
    const users = await getUsers();
    return response.send(users);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});
///finished
router.get("/:id", authorizationForAccsesUser, async (request, response) => {
  const { id: userID } = request.params;
  try {
    const userData = request.userAuthorization;

    if (!userData || !userData.isAdmin) {
      return handleError(response, 403, "Access denied");
    }
    const users = await getUser(userID);
    return response.send(users);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});
///finished
router.put("/:id", authorizationForAccsesUser, async (request, response) => {
  const { id: userID } = request.params;
  try {
    const userData = request.userAuthorization;

    if (userData._id !==userID) {
      return handleError(response, 403, "Access denied");
    }
    let userFromClient = request.body;
    const { error } = userUpdaevalidation(userFromClient);
    if (error) {
      return handleError(response, error.status || 500, error.message);
    }
    userNormalized = normalizedUser(userFromClient);
    user = await userEdited(userID, userNormalized);
    return response.send(user);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});
///finished
router.delete("/:id", authorizationForAccsesUser, async (request, response) => {
  const { id: userID } = request.params;
  try {
    const userData = request.userAuthorization;

    if (userData._id !==userID || !userData.isAdmin) {
      return handleError(response, 403, "Access denied");
    }
    const user = deleteUser(userID);
    return response.send(user);
  } catch (error) { 
    return handleError(response, error.status || 500, error.message);
  }
});
///finished
router.patch("/:id", authorizationForAccsesUser, async (request, response) => {
  const { id: userID } = request.params;
  try {
    const userData = request.userAuthorization;
    if (userData._id !==userID) {
      return handleError(response, 403, "Access denied");
    }
    const user = await ChangeIsBusinessStatus(userID);
    console.log(user);
    return response.send(user);
  } catch (error) {
    return handleError(response, error.status || 500, error.message);
  }
});

module.exports = router;
