const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Validator = require("validator");

const validateregin = require("../../validation/register");
const validatelogin = require("../../validation/login");

const User = require("../../models/User");

router.post("/register", (req, res) => {

  const { errors, isValid } = validateregin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exists" });
    }
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validatelogin(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          date: user.date
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600 // 1 hour in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


const Url = require("../../models/Urls");
const UrlLog = require("../../models/UrlLog")
const Urlclick = require("../../models/Urlclick")
const valid = (str) => {
  var pattern = new RegExp(
    '^((http|https)://)+(www.).*'
  )
  return pattern.test(str)
}

router.post("/teener", (req, res) => {

  const { fullurl, email } = req.body;

  if (!valid(fullurl)) {
    return res.status(400).json({ invalidurl: 'Invalid URL' })

  }

  if (!Validator.isURL(fullurl)) {
    return res.status(400).json({ invalidurl: 'Invalid URL' })
  }

  let domain = (new URL(fullurl));
  let hostname = domain.hostname;
  let shost = hostname.split(".")
  let mid = Math.floor((shost[1].length - 1) / 2)
  let temp = shost[1]
  let domhash = temp[0] + temp[mid] + temp[(temp.length - 1)]
  var shortlist = []
  let alpha = "abcdefghijklmnopqrstuvwxyzABCDEF"
  "GHIJKLMNOPQRSTUVWXYZ0123456789";
  var dateRandom = Date.now().toString() + "" + Math.floor(Math.random() * 1000000000).toString()
  var hash = dateRandom

  while (hash > 0) {
    let remainder = (hash % 62)
    shortlist.push(alpha[remainder])
    hash = Math.floor(hash / 62);
  }
  shortlist.reverse()
  shortlist = shortlist.join("")
  let str = "http://localhost:5000/" + domhash + "/"
  let str1 = str + shortlist

  Url.findOne({ email: email })
    .then(data => {
      if (data) {

        for (const obj of data.listofUrls) {
          if (fullurl == obj.fullurl) {
            return res.status(400).json({ urlalready: "Url already exists" });
          }
        }

        const newLog = new UrlLog({
          fullurl: fullurl,
          shorturl: str1,
        });

        newLog.save()

        const newClick = new Urlclick({
          email: email,
          fullurl: fullurl,
          shorturl: str1,
        });

        newClick.save()

        Url.findOneAndUpdate({ email: email },
          {
            $push: {
              listofUrls: {
                fullurl: fullurl,
                shorturl: str1,
              }
            }
          })
          .then((data) => {
            return res.json({ updated: data })
          })
          .catch(err => res.status(400).json({ err: err }))

      }
      else {

        const newUrl = new Url({
          email: email,
          listofUrls: [{
            fullurl: fullurl,
            shorturl: str1,
          }]
        });

        const newLog = new UrlLog({
          fullurl: fullurl,
          shorturl: str1,
        });

        newLog.save()

        const newClick = new Urlclick({
          email: email,
          fullurl: fullurl,
          shorturl: str1,
        });

        newClick.save()

        newUrl
          .save()
          .then((data) => {
            return res.json({ outcome: "Saved Your Link", data: data })
          })
          .catch((err) => res.status(400).json({ err: err }))
      }
    })
    .catch(err => {
      res.status(400).json({ err: err })
    });

})

router.get("/url/:dom/:url", (req, res) => {

  let teenyurl = req.params.url
  let domt = req.params.dom
  let tenn = "https://shortly2001.herokuapp.com/" + domt + "/" + teenyurl
  console.log(tenn)


  UrlLog.findOne({ shorturl: tenn })
    .then((data) => {
      if (!data) {
        return res.status(400).json({ urlnotfound: "Url does not exist" });
      }

      Url.findOneAndUpdate({ listofUrls: { $elemMatch: { shorturl: data.shorturl } } },
        [{
          $inc: {
            'listofUrls.$': 1
          }
        }]).then(res => console.log(res))

      return res.redirect(data.fullurl)
    })
    .catch(error => {
      console.log(error)
    })
})

router.post("/urlboard", (req, res) => {
  const email = req.body.email

  Url.findOne({ email })
    .then(data => {
      res.json({ data: data.listofUrls })
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

router.post("/urlclicks", (req, res) => {
  const email = req.body.email

  Urlclick.find({ email })
    .then(data => {
      res.json({ data: data })
    })
    .catch(err => {
      res.status(400).json(err)
    })
})


module.exports = router;