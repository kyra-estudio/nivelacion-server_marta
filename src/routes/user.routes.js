const { Router } = require("express")
const controllers = require ("../controllers.js")

const router = Router()

router.post("/sign-up", controllers.user.signUp)
router.post("/sign-in", controllers.user.signIn)
router.post("/logout", controllers.user.logout)
router.get("/getAll", controllers.user.getAll)
// // router.get("/:id", controllers.user.get)
// router.delete("/:id", controllers.user.remove)


module.exports = router