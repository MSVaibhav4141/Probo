import { Router } from "express";
import { cancellExiting, cancellOrder, createEvent, getCurrentOrderBook, getEventChart, getEventOrders, getQtyOfPrice, getUserBalance, orderController } from "../controller/controller";
import { auth } from "../middleware/auth";

export const router: Router = Router();

router.route('/create/event').post(auth, createEvent)
router.route('/initiate/order').post(auth, orderController)
router.route('/get/orderbook/:eventId').get(getCurrentOrderBook)
router.route('/get/chart/:eventId').get(getEventChart)
router.route('/get/balance/:id').get(getUserBalance)
router.route('/get/event/order/:eventId').get(auth, getEventOrders)
router.route('/cancel/order').put(cancellOrder)
router.route('/cancel/exit/order').put(auth, cancellExiting)
router.route('/get/qty').post(getQtyOfPrice)