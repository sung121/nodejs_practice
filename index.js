const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

// app.get("/", function (req, res) {
//   res.send("Hello World");
//   console.log("customer came inside our site!");
// });

app.get("/sound/:name", (req, res) => {
  const { name } = req.params;

  if (name == "dog") {
    console.log("api요청이 왔습니다!!!!!!!");
    res.json({ sound: "멍멍" });
  } else if (name == "cat") {
    console.log("api요청이 왔습니다!!!!!!!");
    res.json({ sound: "야옹" });
  } else if (name == "pig") {
    console.log("api요청이 왔습니다!!!!!!!");
    res.json({ sound: "꿀꿀" });
  } else {
    console.log("api요청이 왔습니다!!!!!!!");
    res.json({ sound: "알 수없음" });
  }
});

app.listen(port);
