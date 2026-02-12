import { ConnectDB } from "./database/Db";
import figlet from "figlet";
import app from "./app";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.clear();
  console.log(figlet.textSync("TYPESCRIPT", { font: "Slant" }));
  console.log(`Server running on port: http://localhost:${port}`);
});

ConnectDB();

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
