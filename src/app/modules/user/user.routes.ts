import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";

const router = Router();

router.post('/register', validateRequest(userValidations.userValidationSchema), userController.createUserIntoDB);
router.get('/get-my-profile',userController.getMyProfile)
export const usersRoute = router;