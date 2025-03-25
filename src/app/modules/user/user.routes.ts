import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";
import auth from "../../middleware/auth";
import { UserRole } from "./user.interface";

const router = Router();

router.post('/register', validateRequest(userValidations.userValidationSchema), userController.createUserIntoDB);
router.get('/get-my-profile', userController.getMyProfile)
router.get('/get-all-users', auth(UserRole.ADMIN), userController.getAllUsers)
router.patch('/update-user-role', auth(UserRole.ADMIN), userController.updateUserRole)
router.delete('/delete-user', auth(UserRole.ADMIN), userController.deleteUser)
export const usersRoute = router;