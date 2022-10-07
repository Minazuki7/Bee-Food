import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCityInput } from "./dto/create-city.input";
import { UpdateCityInput } from "./dto/update-city.input";
import { City, CityDocument } from "@fd-wereact/schemas";

@Injectable()
export class CitesService {
  constructor(
    @InjectModel(City.name)
    private cityModel: Model<CityDocument>
  ) {}
  async create(createCityInput: CreateCityInput): Promise<City> {
    console.log(createCityInput);
    const result = await this.cityModel.create(createCityInput);
    console.log(result);
    return result;
  }

  async findAll() {
    return this.cityModel.find().exec();
  }

  async findOne(id: string) {
    return this.cityModel.findById(id).exec();
  }

  async update(id: string, updateCityInput: UpdateCityInput) {
    return this.cityModel.findByIdAndUpdate(id, updateCityInput).exec();
  }

  remove(id: string) {
    return this.cityModel.findByIdAndRemove(id).exec();
  }
}
