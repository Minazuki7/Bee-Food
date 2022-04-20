import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDriverInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
