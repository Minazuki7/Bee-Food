import { CreateDriverInput } from './create-driver.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @Field(() => Int)
  id: number;
}
