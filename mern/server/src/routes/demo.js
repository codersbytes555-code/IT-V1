import { Router } from "express";
import { create_demo, delete_demo, get_demo, update_demo } from "../controller/demo.js";

const router=Router();

router.get("/",get_demo);
router.post("/",create_demo);
router.delete("/:id",delete_demo);
router.patch("/:id",update_demo);


export default router;