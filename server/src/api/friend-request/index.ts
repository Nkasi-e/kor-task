import { Router } from "express";
import RequestHandler from "./controllers";
import ResponseHandler from "../../common/api-response";
import SendFriendRequestDependencies from "./services";

const router = Router();

router.post(
  "/",
  RequestHandler.sendFriendRequestHandler(
    SendFriendRequestDependencies,
    ResponseHandler
  )
);

router.patch(
  "/:request_id/accept",
  RequestHandler.acceptFriendRequestHandler(
    SendFriendRequestDependencies,
    ResponseHandler
  )
);

router.patch(
  "/:request_id/reject",
  RequestHandler.rejectFriendRequestHandler(
    SendFriendRequestDependencies,
    ResponseHandler
  )
);

export default router;
