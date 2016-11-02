export default function () {
  const express = require("express");
  const app = express();
  const port = 3030;
  const router = express.Router();

  router.route("/").get(function (req, res) {
    res.json({
      message: "root reoute"
    });
  });

  app.use("/api/", router);

  app.listen(port, function () {
    console.log("app started on " + port);
  });
}
