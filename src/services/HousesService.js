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

  async createHouse(body) {
    const res = await api.post('api/houses', body)
    logger.log(res.data)
    AppState.houses.push(res.data)
    return res.data
  }

  async editHouse(body) {
    const res = await api.put('api/houses/' + body.id, body)
    logger.log(res.data)
    AppState.activeHouse = res.data
  }

  async deleteHouse(id) {
    const res = await api.delete('api/houses/' + id)
    logger.log(res.data)
    AppState.houses.filter(h => h.id !== id)
  }
}
export const housesService = new HousesService()