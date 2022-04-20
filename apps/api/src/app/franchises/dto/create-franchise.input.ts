import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFranchiseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
