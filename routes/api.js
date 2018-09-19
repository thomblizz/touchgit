const express = require("express");
const router = express.Router();
const request = require("request");
const User = require("../elastic/collections/users");
const gitHeaders = {
  "User-Agent": "http://developer.github.com/v3/#user-agent-required",
  //"Authorization": "token 00ad42ea609c3586ddbcf67da4da813a3a269fc0"
};
router.get('/user', function(req, res, next) {
  const u = req.query.u;
  request({
    url: `https://api.github.com/users/${u}`,
    json: true,
    headers: gitHeaders
  }, (err, resp, body) => {
    User.add(body);
    res.json(body);
  });

});

router.get('/fetchUsers', function(req, res, next) {
  const u = req.query.u;
  User.search().then(usrs => res.json(usrs));  
});


router.get('/repo', function(req, res, next) {
  const u = req.query.u;
  const r = req.query.r;
  if (u)
    request({
      url: `https://api.github.com/users/${u}/repos`,
      json: true,
      headers: gitHeaders
    }, (err, resp, body) => {
      res.json(body);
    });
  else if (r) {
    console.log(r)
    request({
      url: `https://api.github.com/repos/${r}`,
      json: true,
      headers: gitHeaders
    }, (err, resp, body) => {
      res.json(body);
    });
  }

});


module.exports = router;


