const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const http = require("http");

const corsOptions = {
  origin: "*",
};

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: corsOptions,
});

io.on("connection", socket => {
  console.log("Se ha conectado un usuario");

  socket.on("mensaje", data => {
    console.log("Mensaje recibido:", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
