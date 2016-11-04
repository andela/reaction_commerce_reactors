export default function () {
  const mongoose = require("mongoose");
  const express = require("express");
  const app = express();
  const port = 3030;
  const bodyParser = require("body-parser");

  mongoose.connect("mongodb://127.0.0.1:3001/meteor", (err) => {
    if (err) {
      console.log(err);
    }
  });

  app.get("/", function (req, res) {
    res.json({
      message: "root reoute"
    });
  });

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  const router = express.Router();
  require("./routes/email")(router);
  require("./routes/cart")(router);
  require("./routes/products")(router);
  require("./routes/order")(router);
  require("./routes/shop")(router);
  app.use("/api/", router);


  app.listen(port, function () {
    console.log("app started on " + port);
  });
}
