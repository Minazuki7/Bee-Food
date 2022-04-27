import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateZoneInput } from "./dto/create-zone.input";
import { UpdateZoneInput } from "./dto/update-zone.input";
import { Zone, ZoneDocument } from "./entities/zone.entity";

@Injectable()
export class ZonesService {
  constructor(
    @InjectModel(Zone.name)
    private zoneModel: Model<ZoneDocument>
  ) {}
  async create(createZoneInput: CreateZoneInput): Promise<Zone> {
    const createdzone = new this.zoneModel(createZoneInput);
    return createdzone.save();
  }

  async findAll() {
    return this.zoneModel.find().exec();
  }

  async findOne(id: string) {
    return this.zoneModel.findById(id).exec();
  }

  async update(id: string, updateZoneInput: UpdateZoneInput) {
    return this.zoneModel.findByIdAndUpdate(id, updateZoneInput).exec();
  }

  remove(id: string) {
    return this.zoneModel.findByIdAndRemove(id).exec();
  }
}
