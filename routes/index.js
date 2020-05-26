const router = require('express').Router();
// basics routes
router.get('/', (req, res) => {
  res.render('index', {title: 'Ridhu',user:req.user});
});

module.exports = router;
