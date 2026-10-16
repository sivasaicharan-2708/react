import { BUY_CAKE } from "./cakeTypes"

export const buyCake = (quantity = 1) => ({
  type: BUY_CAKE,
  quantity
})
