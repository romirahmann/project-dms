const express = require("express");
const http = require("http"); // Import http
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app); // Buat server HTTP
const io = socketIo(server, { cors: { origin: "*" } }); // Inisialisasi WebSocket

const mainRoutes = require("./src/routes/routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Simpan instance io agar bisa diakses di seluruh aplikasi
app.set("socketio", io);

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

// Gunakan router utama
app.use("/api/", mainRoutes);

// Redirect ke API error jika route tidak ditemukan
app.get("*", (req, res) => {
  res.redirect("/api/error");
});

// Handle WebSocket connection
io.on("connection", (socket) => {
  console.log("New WebSocket Connection:", socket.id);

  socket.on("disconnect", () => {
    console.log("WebSocket Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  // Gunakan server.listen() agar WebSocket berjalan
  console.log(
    `Backend is Running on PORT: ${PORT}. ${
      process.env.DEV == "TRUE" ? "<Development Mode>" : ""
    }`
  );
});
