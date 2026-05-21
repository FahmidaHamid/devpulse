import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTION_STRING as string,
  port: process.env.PORT as string,
  node_env: process.env.NODE_ENV as string,
  jwt_secret: process.env.JWT_ACCESS_SECRET as string,
  ref_secret: process.env.JWT_REFRESH_SECRET as string,
};

export default config;
