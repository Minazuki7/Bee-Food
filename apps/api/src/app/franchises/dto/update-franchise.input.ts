import { CreateFranchiseInput } from './create-franchise.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFranchiseInput extends PartialType(CreateFranchiseInput) {
  @Field(() => Int)
  id: number;
}
