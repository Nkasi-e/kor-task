import { app } from "../server";

let connection: any;

const initializeWebServer = (customMiddleware?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      //add middlewares
      if (customMiddleware) {
        app.use(customMiddleware);
      }

      //start server
      const webServerPort = process.env.PORT ? process.env.PORT : null;
      connection = app.listen(webServerPort, () => {
        console.log(`Web server started on port ${webServerPort}`);
        resolve(connection.address());
      });
    } catch (error) {
      console.error("Error while initialising the web server \n", error);
      process.exit();
    }
  });
};

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
