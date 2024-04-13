import { Router } from "express";
import RequestHandler from "./controllers";
import ResponseHandler from "../../common/api-response";
import UserDependencies from "./services";

const router = Router();

router.patch(
  "/update/:user_id",
  RequestHandler.upUserHandler(UserDependencies, ResponseHandler)
);

router.get(
  "/profile",
  RequestHandler.getUserHandler(UserDependencies, ResponseHandler)
);

router.get(
  "/profile/:user_id",
  RequestHandler.getUserByIdHandler(UserDependencies, ResponseHandler)
);

export default router;
