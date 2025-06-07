const express = require("express");
const usersRoutes = require("./routes/user.routes");
const port = 3000;
const app = express();

app.use(express.json());
app.use("/api/users", usersRoutes);

app.listen(port, () => console.log("Server running on port" + port));
