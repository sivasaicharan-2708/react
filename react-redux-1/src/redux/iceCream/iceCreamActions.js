import { BUY_ICE_CREAM } from "./iceCreamTypes";

export const buyIceCream = (quantity = 1) => ({
  type: BUY_ICE_CREAM,
  quantity
})
