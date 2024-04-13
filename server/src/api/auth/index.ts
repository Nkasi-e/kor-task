import { Router } from "express";
import RequestHandler from "./controllers";
import ResponseHandler from "../../common/api-response";
import AuthDependencies from "./services";

const router = Router();

router.post(
  "/signup",
  RequestHandler.signUpUserHandler(AuthDependencies, ResponseHandler)
);

router.post(
  "/signin",
  RequestHandler.signinUserHandler(AuthDependencies, ResponseHandler)
);

export default router;
