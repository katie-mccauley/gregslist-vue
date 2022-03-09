import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
class HousesService {

  async getAll() {
    const res = await api.get('api/houses')
    logger.log(res.data)
    AppState.houses = res.data
  }

  async getById(id) {
    const res = await api.get('api/houses/' + id)
    logger.log(res.data)
    AppState.activeHouse = res.data
  }
}
export const housesService = new HousesService()