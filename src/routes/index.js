const express = require('express');


const router  = express.Router();

router.get('/',(req, res) => {
    res.render(`./links/welcome.hbs`);
});



module.exports = router;