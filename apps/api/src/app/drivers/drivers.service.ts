import { Injectable } from '@nestjs/common';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Injectable()
export class DriversService {
  create(createDriverInput: CreateDriverInput) {
    return 'This action adds a new driver';
  }

  findAll() {
    return `This action returns all drivers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverInput: UpdateDriverInput) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
