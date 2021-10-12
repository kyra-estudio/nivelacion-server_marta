const { Router } = require("express")
const controllers = require ("../controllers.js")

const router = Router()

router.post("/create", controllers.message.create)
router.post("/chat", controllers.message.chat)

module.exports = router