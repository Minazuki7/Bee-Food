import { Injectable } from '@nestjs/common';
import { CreateFranchiseInput } from './dto/create-franchise.input';
import { UpdateFranchiseInput } from './dto/update-franchise.input';

@Injectable()
export class FranchisesService {
  create(createFranchiseInput: CreateFranchiseInput) {
    return 'This action adds a new franchise';
  }

  findAll() {
    return `This action returns all franchises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} franchise`;
  }

  update(id: number, updateFranchiseInput: UpdateFranchiseInput) {
    return `This action updates a #${id} franchise`;
  }

  remove(id: number) {
    return `This action removes a #${id} franchise`;
  }
}
