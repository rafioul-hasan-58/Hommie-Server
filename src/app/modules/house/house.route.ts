import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { houseController } from "./house.controller";
import { houseValidations } from "./house.validation";

const router = Router();

router.post('/create-house', validateRequest(houseValidations.houseValidationSchema), houseController.createUserIntoDB);
router.get('/get-all-houses', houseController.getAllHouseFromDB);
router.get('/get-single-house/:id', houseController.getSingleHouseFromDB);
router.patch('/update-house/:id', validateRequest(houseValidations.updatehouseValidationSchema), houseController.updateHouseIntoDB);
router.delete('/delete-house/:id', houseController.deleteHouseFromDB);

export const houseRoute = router;