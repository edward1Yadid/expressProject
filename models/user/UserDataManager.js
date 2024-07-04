const config = require("config");
const DB = config.get("DB");
const lodash = require("lodash");
const { User } = require("../../schemas/user/userMongooseSchema");

const bcrypt = require("bcryptjs");
const {
  comparePasswords,
  generateTaokenToUser,
} = require("../../authorization/password/compareHashToUserPass");
const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) {
        return console.log("User already registered");
      }
      user = new User(normalizedUser);
      user = await user.save(user);
      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve("user created not in mongodb");
  }
};

const loginUser = async (userFromClient) => {
  const { email, password: passwordFromData} = userFromClient;
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        return new Error("Invalid email or passworddd");
      }

      if (user.failedLoginAttempts >= 3 && user.lastFailedLoginAt) {
        const lockoutDuration = 24 * 60 * 60 * 1000;
        const lockoutTimeElapsed = Date.now() - user.lastFailedLoginAt;
        const remainingTime = lockoutDuration - lockoutTimeElapsed;
        if (lockoutTimeElapsed < lockoutDuration) {
          throw new Error(`User is locked out due to too many failed login attempts. Please try again in ${Math.ceil(remainingTime / (60 * 1000))} minutes.`);
        }
      }

      const isPasswrodValid = comparePasswords(passwordFromData, user.password);
      if (!isPasswrodValid) {
        user.failedLoginAttempts++;
        user.lastFailedLoginAt = Date.now();
        await user.save();
        return new Error("Invalid email or password");
      }
      user.failedLoginAttempts = 0;
      user.lastFailedLoginAt = null;
      await user.save();
      const token = generateTaokenToUser(user)
      return Promise.resolve(token);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve("user created not in mongodb");
  }
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      let users = await User.find();
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve("get users not in mongodb");
  }
};

const getUser = async (userID) => {
  if (DB === "MONGODB") {
    try {
      let users = await User.findById(userID);
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve("get users not in mongodb");
  }
};

const deleteUser = async (userID) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findByIdAndDelete(userID);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve("can't delete user or user dosent exist ");
  }
};

const userEdited = async (userID, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findByIdAndUpdate(userID, normalizedUser, {
        new: true,
      });
      if (!user) {
        return new Error("User Dose'nt exist ");
      }
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve("can't Edit user or user dosent exist ");
  }
};

const ChangeIsBusinessStatus = async (userID) => {
  if (DB === "MONGODB") {
    try {
      const pipeline = [
        {
          $set: {
            isBusiness: {
              $cond: {
                if: "$isBusiness",
                then: false,
                else: true,
              },
            },
          },
        },
      ];

      let user = await User.findByIdAndUpdate(userID, pipeline, {
        new: true,
      });
      if (!user)
        throw new Error(
          "could not change user business status, because user not found"
        );
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
  }
  return Promise.resolve("you can't change the business type");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.userEdited = userEdited;
exports.ChangeIsBusinessStatus = ChangeIsBusinessStatus;
