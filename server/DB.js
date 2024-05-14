import pg from "pg";
import { Sequelize } from "sequelize";

const sequelizeOptions = {
  host: process.env.PSQL_HOST || "localhost",
  port: process.env.PSQL_PORT || 5432,
  dialect: "postgres",
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  }
};

export let sequelize = new Sequelize(
  process.env.PSQL_NAME || "neofilm",
  process.env.PSQL_USER || "maxim",
  process.env.PSQL_PASSWORD || "",
  sequelizeOptions
);

export const createDBIfNotExists = async (dbName, username) => {
  try {
    const client = new pg.Pool({
      host: process.env.PSQL_HOST,
      port: process.env.PSQL_PORT,
      database: process.env.PSQL_NAME || "neofilm",
      user: username,
      password: process.env.PSQL_PASSWORD,
    });
    
    await client.connect();
    
    const res = await client.query("SELECT datname FROM pg_database WHERE datname = $1", [dbName]);
    
    if (res.rows.length === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      await sequelize.authenticate();
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
    
    await client.end();
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};
