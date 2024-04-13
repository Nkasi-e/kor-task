import { initializeWebServer } from "./config/server-api";
import { initialiseDatabase } from "./config/database-connection";

const startApp = async (): Promise<void> => {
  try {
    console.log("starting app...");
    await initializeWebServer();
    await initialiseDatabase(process.env.NODE_ENV);
    console.log("The app has started successfully");
  } catch (error) {
    console.log("App error occurred during app startup", error);
  }
};

startApp();
