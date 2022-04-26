import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCountryInput } from "./dto/create-country.input";
import { UpdateCountryInput } from "./dto/update-country.input";
import { Country, CountryDocument } from "./entities/country.entity";

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private countryModel: Model<CountryDocument>
  ) {}
  async create(createCountryInput: CreateCountryInput): Promise<Country> {
    const createdcountry = new this.countryModel(createCountryInput);
    return createdcountry.save();
  }

  async findAll() {
    return this.countryModel.find().exec();
  }

  async findOne(id: string) {
    return this.countryModel.findById(id).exec();
  }

  async update(id: string, updateCountryInput: UpdateCountryInput) {
    return this.countryModel.findByIdAndUpdate(id, updateCountryInput).exec();
  }

  remove(id: string) {
    return this.countryModel.findByIdAndRemove(id).exec();
  }
}
