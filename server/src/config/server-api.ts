import { app, server } from "../server";

let connection: any;

/**
 * Initialize the web server with optional custom middleware.
 *
 * @param {any} customMiddleware - optional custom middleware to be added
 * @return {Promise<any>} a Promise that resolves to the server address
 */
const initializeWebServer = (customMiddleware?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      //add middlewares
      if (customMiddleware) {
        app.use(customMiddleware);
      }

      //start server
      const webServerPort = process.env.PORT ? process.env.PORT : null;
      connection = server.listen(webServerPort, () => {
        console.log(`Web server started on port ${webServerPort}`);
        resolve(connection.address());
      });
    } catch (error) {
      console.error("Error while initialising the web server \n", error);
      process.exit();
    }
  });
};

/**
 * Stops the web server by closing the connection.
 *
 * @return {Promise<void>} A promise that resolves once the server is stopped.
 */
const stopWebServer = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (connection && connection.close) {
      connection.close(() => {
        resolve();
      });
    }
  });
};

export { stopWebServer, initializeWebServer };
