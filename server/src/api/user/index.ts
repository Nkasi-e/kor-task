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

router.get(
  "/:user_id/notifications",
  RequestHandler.getUserNotificationsHandler(UserDependencies, ResponseHandler)
);

router.patch(
  "/:user_id/block",
  RequestHandler.blockUserHandler(UserDependencies, ResponseHandler)
);

router.patch(
  "/:user_id/report",
  RequestHandler.reportUserStausHandler(UserDependencies, ResponseHandler)
);

export default router;
