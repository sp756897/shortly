const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require('http').createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
const Urlclick = require("./models/Urlclick")
const UrlLog = require("./models/UrlLog")

app.get("/:dom/:url", (req, res) => {

  let teenyurl = req.params.url
  let domt = req.params.dom
  let tenn = "http://localhost:5000/" + domt + "/" + teenyurl
  console.log(tenn)


  UrlLog.findOne({ shorturl: tenn })
    .then((data) => {
      if (!data) {
        return res.status(400).json({ urlnotfound: "Url does not exist" });
      }

      Urlclick.findOneAndUpdate({ shorturl: data.shorturl },
        {
          $inc: {
            clicked: 1
          }
        }).then(res => console.log(res))

      return res.redirect(data.fullurl)
    })
    .catch(error => {
      console.log(error)
    })
})

app.use(cors());

const users = require("./routes/api/users");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB

mongoose.set('useFindAndModify', false);

mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
http.listen(port, () => console.log(`Server up and running on port ${port} !`));