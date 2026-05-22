import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { validateAuthPropertiesBeforeSignup } from "../../middleware/validateAuthPropertiesBeforeSignup";
import { validateAuthPropertiesBeforeLogin } from "../../middleware/validateAuthPropertiesBeforeLogin";

const router = Router();

router.post("/signup", validateAuthPropertiesBeforeSignup, signup);

router.post("/login", validateAuthPropertiesBeforeLogin, login);

export const authRouter = router;
