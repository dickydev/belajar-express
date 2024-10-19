import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import UserRoutes from "./src/routes/userRoutes.js";
import BookRoutes from "./src/routes/bookRoutes.js";
import CategoryRoutes from "./src/routes/categoryRoutes.js";
import AuthRoutes from "./src/routes/authRoutes.js";
// import db from "./src/config/db.js";
import { syncAndAssociateModels } from "./src/models/index.js";

dotenv.config();
// import helmet from "helmet";

const app = express();
const port = 4000;

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: "Content-Length",
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
  })
);

// express-session middleware
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60000,
    },
  })
);

// Menguraikan menjadi json(JavaScript Object Notation)
app.use(bodyParser.json());

// Helmet Middleware
// app.use(helmet());

// Middlaware untuk melakukan dan menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something may be broken");
});

// Menangani permintaan GET ke root path
app.get("/", (req, res) => {
  res.send("Halo Dunia");
});

// Rute untuk permintaan GET ke /about
app.get("/about", (req, res) => {
  res.send("ini adalah halaman about");
});

// Rute untuk permintaan GET ke /contact
app.get("/contact", (req, res) => {
  res.send("ini adalah halaman contact");
});

// Rute untuk permintaan POST ke /submit
app.post("/submit", (req, res) => {
  res.send("Data berhasil dikirim!");
});

// Rute untuk permintaan GET dengan parameter
// app.get("/users/:id", (req, res) => {
//   const id = req.params.id;
//   res.send(`Menampilkan informasi pengguna dengan ID : ${id}`);
// });

app.use("/api/users", UserRoutes);
app.use("/api/books", BookRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/auth", AuthRoutes);

// app.listen(port, () => {
//   console.log(`Server berjalan di port http://localhost:${port}`);
// });

syncAndAssociateModels()
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("Server running on PORT", process.env.PORT || port);
    });
  })
  .catch((error) => {
    console.error("Error during sync or starting server : ", error);
  });
