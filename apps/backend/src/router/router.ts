import { Router } from "express";
import { cancellExiting, cancellOrder, createEvent, getCurrentOrderBook, getEventChart, getEventOrders, getQtyOfPrice, getUserBalance, orderController } from "../controller/controller";

export const router: Router = Router();

router.route('/create/event').post(createEvent)
router.route('/initiate/order').post(orderController)
router.route('/get/orderbook/:eventId').get(getCurrentOrderBook)
router.route('/get/chart/:eventId').get(getEventChart)
router.route('/get/balance/:id').get(getUserBalance)
router.route('/get/event/order/:eventId').get(getEventOrders)
router.route('/cancel/order/:orderId/:qty').put(cancellOrder)
router.route('/cancel/exit/order/:orderId/:qty').put(cancellExiting)
router.route('/get/qty').post(getQtyOfPrice)