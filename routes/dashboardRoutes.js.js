const express = require('express');
const { loadData, updateText, updateLogo } = require('../controllers/dashboardControllers.js');
const singleUpload = require('../middlewares/multer.js');


const router = express.Router();


// Load logo and text  
router.route("/loaddata").get(loadData)

// Update text
router.route("/updatetext").put(updateText)

// Update logo
router.route("/updatelogo").put(singleUpload, updateLogo)


module.exports = router;
