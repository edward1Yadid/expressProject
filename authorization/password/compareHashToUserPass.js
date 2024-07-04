const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PrivateKey = config.get("JWT_KEY");

const generateTaokenToUser=(user)=>{
    const { _id, isBusiness, isAdmin}=user
    const token = jwt.sign({ _id, isBusiness, isAdmin }, PrivateKey
    );
    return token

}

const comparePasswords=(password,HashedPassword)=>{
return bcrypt.compareSync(password,HashedPassword)
}

exports.generateTaokenToUser=generateTaokenToUser
exports.comparePasswords=comparePasswords