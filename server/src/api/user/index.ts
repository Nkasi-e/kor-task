import { Router } from "express";
import RequestHandler from "./controllers";
import ResponseHandler from "../../common/api-response";
import UserDependencies from "./services";

const router = Router();

router.patch(
  "/:user_id/update",
  RequestHandler.updateUserStatusHandler(UserDependencies, ResponseHandler)
);

router.get(
  "/profile",
  RequestHandler.getUserHandler(UserDependencies, ResponseHandler)
);

router.get(
  "/:user_id",
  RequestHandler.getUserByIdHandler(UserDependencies, ResponseHandler)
);

router.get(
  "/",
  RequestHandler.getAllUserHandler(UserDependencies, ResponseHandler)
);

export default router;
