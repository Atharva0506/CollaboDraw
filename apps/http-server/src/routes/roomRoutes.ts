import { Router } from "express";
import { createRoom, getChats ,getSlug, getUserRooms} from "../controllers/roomControllers";

const router: Router = Router();

router.post("/create", createRoom);

router.get("/get-chats/:roomId", getChats);

router.get("/get-slug/:slug",getSlug);

router.get("/user-rooms", getUserRooms);


export default router;