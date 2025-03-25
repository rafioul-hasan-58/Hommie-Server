import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { listingValidations } from "./listing.validation";
import { ListingContrller } from "./listing.controller";

const router = Router();

router.post('/create-listing', validateRequest(listingValidations.listingValidationSchema), ListingContrller.createUserIntoDB
)

export const listingRoute = router;