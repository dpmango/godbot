/* eslint-disable no-labels */
const express = require("express");
const multer = require("multer");
const uniqid = require("uniqid");
const randomWords = require("random-words");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}_${randomWords() + randomWords()}.${file.originalname.slice(
        file.originalname.length - 3,
        file.originalname.length
      )}`
    );
  },
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const upload = multer({ storage: storage });

const recomendatios = [
  {
    signal: "15.07.22 12:48:01",
    name: "Bitcoin",
    shortname: "BTC",
    icon: "BTC.svg",
    order_type: "SHORT",
    order_status: "В ожидании",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 90,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
  {
    signal: "15.07.22 12:48:01",
    name: "Etherium",
    shortname: "ETH",
    icon: "ETH.svg",
    order_type: "LONG",
    order_status: "Закрыта по стопу",
    order_benefit: "-15%",
    enter_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    exit_cost: [
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
      "19,481.29",
    ],
    stop_los: "$19,481.29",
    risk: 45,
  },
];

const dataHour = [
  {
    name: "series-1",
    data: [
      3235440, 40123431, 33125345, 53245310, 44532119, 604331, 7324310, 9451312,
      123515,
    ],
  },
  {
    name: "series-2",
    data: [
      3312310, 5543210, 343543, 35234203, 4312934, 6203211, 712101, 9322321,
      1232315,
    ],
  },
  {
    name: "series-3",
    data: [
      331110, 554120, 34335, 355203, 439334, 622011, 713101, 93221, 123135,
    ],
  },
  {
    name: "series-4",
    data: [
      3354110, 55434510, 3431235, 35232103, 43123934, 6201321, 7313201,
      93423221, 12313215,
    ],
  },
  {
    name: "series-5",
    data: [
      3312310, 55321410, 343511, 3520323, 43123934, 620111, 7310121, 9332221,
      1234315,
    ],
  },
];

const investor = [
  {
    title: "Bitcoin   BTC",
    icon: "BTC.svg",
    series: [
      {
        name: this.title,
        data: [
          3312310, 5543210, 343543, 35234203, 4312934, 6203211, 712101, 9322321,
          1232315,
        ],
      },
    ],
  },
  {
    title: "Bitcoin   BTC",
    icon: "BTC.svg",
    series: [
      {
        name: this.title,
        data: [
          3312310, 5543210, 343543, 35234203, 4312934, 6203211, 712101, 9322321,
          1232315,
        ],
      },
    ],
  },
];

let users = [
  {
    login: "can4ik22",
    password: "10061978Asd",
    email: "Alex",
    city: "Kiev",
    tariff: "Трейдер",
    name: "can4ik22@gmail.com",
    bank_value: "0",
    subscription_date: "2022-11-01T22:53:20Z",
    id: uniqid(),
  },
];

const languages = [
  { language: "RU", icon: "rus.svg" },
  { language: "EN", icon: "eng.svg" },
];

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is starting on port: " + PORT);
});

app.post("/api/post", upload.array("files", 12), (req, res, next) => {
  const files = req.files.map((elem) => elem.filename);
  if (!req.files.length) {
    res.status(500).json({
      error: "Please upload a files!",
    });
  } else {
    res.status(200).json({
      photos: files,
      ...req.body,
    });
  }
});

app.post("/investor", (req, res) => {
  if (req.body.key === "31sda$sd#231wfdsS*31)9s") {
    res.json(investor);
  } else {
    res.status(500).json({ error: "Invalid key" });
  }
});

app.post("/users/add", (req, res) => {
  if (req.body) {
    users.push(req.body);
    res.json(req.body);
  } else {
    res.status(400).json({ error: "Something error" });
    throw new Error("Bad request");
  }
});

app.post("/chart", (req, res) => {
  if (req.query.coin === "BTC" && req.body.key === "BTC") {
    res.json(dataHour);
  } else {
    res.status(500).json({ error: "Invalid key" });
  }
});

app.post("/user", (req, res) => {
  const currentUser = users.filter(
    (elem) =>
      elem.login === req.body.login && elem.password === req.body.password
  );

  if (!currentUser.length) {
    res.status(400).json({ error: "Incorrect password or login" });
    throw new Error("Bad request");
  }

  res.json(...currentUser);
});

app.post("/rec", (req, res) => {
  if (req.body.key === "31sda$sd#231wfdsS*31)9s") {
    res.json(recomendatios);
  } else {
    res.status(500).json({ error: "Invalid key" });
  }
});

app.get("/languages", (req, res) => {
  res.json(languages);
});

app.get("/api", (req, res) => {
  res.json({ test: true });
});

app.get("/winrateToday", (req, res) => {
  res.json({ winrate: getRandomInt(100) });
});
