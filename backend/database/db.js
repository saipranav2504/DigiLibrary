import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "config/config.env"),
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  String(process.env.DB_PASSWORD),
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");
    await sequelize.sync({ alter: true });
    console.log("Tables synced");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};

export default sequelize;
