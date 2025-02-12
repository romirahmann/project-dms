const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const mainRoutes = require("./src/routes/routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis dari folder "views"
app.use(express.static(path.join(__dirname, "src", "views")));
app.use(express.static(path.join(__dirname, "src", "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "views", "index.html"));
});

app.get("/api/routes-data", (req, res) => {
  res.sendFile(
    path.join(__dirname, "src/routes/master_routes/routes.data.json")
  );
});

app.use("/api/", mainRoutes);

app.get("*", (req, res) => {
  res.redirect("/api/error");
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(
    `Backend is Running on PORT: ${PORT}. ${
      process.env.DEV == "TRUE" ? "<Development Mode>" : ""
    }`
  );
});
