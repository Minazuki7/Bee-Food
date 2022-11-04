import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Occurrence {
  @Field(() => String, {
    description: "name",
    nullable: true,
  })
  name: string;
  @Field(() => Number, {
    description: "occurrence",
    nullable: true,
  })
  occurrence: string;
}
