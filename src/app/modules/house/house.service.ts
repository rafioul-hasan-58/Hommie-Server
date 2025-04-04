import AppError from "../../errors/AppError";
import httpStatus from 'http-status'
import { House } from "./House.model";
import { IHouse } from "./house.interface";

const createHouseIntoDB = async (payload: IHouse) => {
    const result = await House.create(payload);
    return result
}
const getAllHouseFromDB = async () => {
    const result = await House.find();
    return result
}
const getSingleHouseFromDB = async (id: string) => {
    const result = await House.findById(id);
    return result
}
const updateHouseIntoDB = async (id: string, payload: Partial<IHouse>) => {
    const house = await House.findById(id);
    if (!house) {
        throw new AppError(httpStatus.NOT_FOUND, 'House not found')
    }
    // console.log(id, payload);
    const result = await House.findByIdAndUpdate(id, payload, { new: true })
    return result
}
const deleteHouseFromDB = async (id: string) => {
    const house = await House.findById(id);
    if (!house) {
        throw new AppError(httpStatus.NOT_FOUND, 'House not found')
    }
    const result = await House.findByIdAndDelete(id)
    return result
}


export const HouseService = {
    createHouseIntoDB,
    getAllHouseFromDB,
    getSingleHouseFromDB,
    updateHouseIntoDB,
    deleteHouseFromDB
}