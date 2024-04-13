const { Database } = require("./database");
import { Response, NextFunction } from "express";

const getConfig = (env: string) => {
  return env === "test"
    ? process.env.TEST_DATABASE_URL
    : env === "development"
    ? process.env.DEVELOPMENT_DATABASE_URL
    : env === "staging"
    ? process.env.STAGING_DATABASE_URL
    : process.env.PRODUCTION_DATABASE_URL;
};

const initialiseDatabase = (env?: any) => {
  if (!Database.connection.readyState) {
    let config = getConfig(env);

    return Database.connect(config, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
      .then(() =>
        console.log(
          "DB connection up... & using %s database connection...",
          process.env.NODE_ENV
        )
      )
      .then(() => Database);
  }

  return Database;
};

const databaseMiddleware = async (res: Response, next: NextFunction) => {
  try {
    await initialiseDatabase();
    next();
  } catch (error) {
    console.error("Database error on middleware", error);
    return error;
  }
};

const openDatabaseConnection = (environment: any) => {
  try {
    initialiseDatabase(environment).then((conn: any) => conn);
  } catch (error) {
    console.error("Error starting initiating database ", error);
  }
};

const closeDatabaseConnection = () => {
  if (Database && Database.connection && Database.connection.readyState === 1) {
    Database.connection
      .close()
      .catch((e: Error) =>
        console.error("error while closing database connection \n", e)
      );
  }
};

const dropDatabase = () => {
  if (Database && Database.connection) {
    Database.connection
      .dropDatabase()
      .catch((e: Error) =>
        console.error("error while dropping the database \n", e)
      );
  }
};

const dropCollection = (collectionName: any) => {
  if (Database && Database.connection) {
    Database.connection
      .dropCollection(collectionName)
      .catch((e: Error) =>
        console.error(
          "error while droping database collection for %s \n",
          collectionName,
          e
        )
      );
  }
};

const createCollection = (collectionName: any) => {
  if (Database && Database.connection) {
    Database.connection
      .createCollection(collectionName)
      .catch((e: Error) =>
        console.error(
          "error while creating database collection for %s \n",
          collectionName,
          e
        )
      );
  }
};

const deleteAllCollectionRecords = (dbContext: any) => {
  if (
    dbContext &&
    dbContext instanceof Database.Model &&
    dbContext.deleteMany
  ) {
    dbContext
      .deleteMany({})
      .then()
      .catch((e: Error) =>
        console.error(
          "error while deleting all records from collection %s \n",
          e
        )
      );
  }
};

export {
  initialiseDatabase,
  databaseMiddleware,
  openDatabaseConnection,
  closeDatabaseConnection,
  dropDatabase,
  dropCollection,
  createCollection,
  deleteAllCollectionRecords,
};
