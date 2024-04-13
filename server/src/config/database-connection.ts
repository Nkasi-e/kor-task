const { Database } = require("./database");

/**
 * Retrieves the appropriate database URL based on the environment.
 *
 * @param {string} env - the environment to determine the database URL for
 * @return {any} the database URL based on the environment
 */
const getConfig = (env: string): any => {
  return env === "test"
    ? process.env.TEST_DATABASE_URL
    : env === "development"
    ? process.env.DEVELOPMENT_DATABASE_URL
    : env === "staging"
    ? process.env.STAGING_DATABASE_URL
    : process.env.PRODUCTION_DATABASE_URL;
};

/**
 * Function to initialize the database.
 *
 * @param {any} env - optional environment variable
 * @return {Promise<Database>} Promise that resolves to the Database
 */
const initialiseDatabase = (env?: any) => {
  if (!Database.connection.readyState) {
    let config = getConfig(env);

    return Database.connect(config, {})
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

export { initialiseDatabase };
