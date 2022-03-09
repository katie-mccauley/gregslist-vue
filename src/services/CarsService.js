import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CarsService{
  async getAll(){
    const res = await api.get('api/cars')
    logger.log('[get all cars]', res.data)
    AppState.cars = res.data
  }

  async getById(id){
    const res = await api.get('api/cars/' + id)
    logger.log('[get car by id]', res.data)
    AppState.activeCar = res.data
  }

  async create(carData){
    const res = await api.post('api/cars', carData)
    logger.log('[create car]', res.data)
    AppState.cars.push(res.data)
    // NOTE returns car to the form so you can push from there
    return res.data
  }

  async update(carData){
    const res = await api.put('api/cars/'+ carData.id, carData)
    logger.log('[update car]', res.data)
    AppState.activeCar = res.data
  }
}

export const carsService = new CarsService()
