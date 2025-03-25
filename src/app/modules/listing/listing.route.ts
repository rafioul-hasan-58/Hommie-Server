import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { listingValidations } from "./listing.validation";
import { listingController } from "./listing.controller";

const router = Router();

router.post('/create-listing', validateRequest(listingValidations.listingValidationSchema), listingController.createUserIntoDB);
router.get('/get-all-listings',listingController.getAllListingFromDB);
router.get('/get-single-listing/:id',listingController.getSingleListingFromDB);
router.patch('/update-listing/:id',listingController.updateListingIntoDB);
router.delete('/delete-listing/:id',listingController.deleteListingFromDB);

export const listingRoute = router;