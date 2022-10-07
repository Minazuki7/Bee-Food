import { InputType, Field, Float } from "@nestjs/graphql";

@InputType()
export class CreateLocationInput {
  @Field(() => Float, { description: "longitude" })
  longitude: number;

  @Field(() => Float, { description: "latitude" })
  latitude: number;
}
