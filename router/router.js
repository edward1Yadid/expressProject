const express =require("express")
const router=express.Router()

const cardsRaouter=require("../middleware/card/middlewareCard")
const usersRaouter=require("../middleware/user/middlewareUser")

router.use("/cards",cardsRaouter)
router.use("/users",usersRaouter)

module.exports=router