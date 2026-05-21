import app from "./app";
import config from "./config";
import { initializeDatabase } from "./db";

const main = async () => {
  initializeDatabase();
  app.listen(config.port, () => {
    console.log(`Server is running at port: ${config.port}`);
  });
};

main();
