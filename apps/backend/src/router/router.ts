import { Router } from "express";
import { createEvent, getCurrentOrderBook, getEventChart, getUserBalance, orderController } from "../controller/controller";

export const router: Router = Router();

router.route('/create/event').post(createEvent)
router.route('/initiate/order').post(orderController)
router.route('/get/orderbook/:eventId').get(getCurrentOrderBook)
router.route('/get/chart/:eventId').get(getEventChart)
router.route('/get/balance/:id').get(getUserBalance)