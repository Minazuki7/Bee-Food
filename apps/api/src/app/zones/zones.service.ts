import { Injectable } from '@nestjs/common';
import { CreateZoneInput } from './dto/create-zone.input';
import { UpdateZoneInput } from './dto/update-zone.input';

@Injectable()
export class ZonesService {
  create(createZoneInput: CreateZoneInput) {
    return 'This action adds a new zone';
  }

  findAll() {
    return `This action returns all zones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zone`;
  }

  update(id: number, updateZoneInput: UpdateZoneInput) {
    return `This action updates a #${id} zone`;
  }

  remove(id: number) {
    return `This action removes a #${id} zone`;
  }
}
