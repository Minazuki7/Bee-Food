import { InputType, Int, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateZoneInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID, { description: "Zone's city" })
  city: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "Zone's  name" })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: "Zone Raduis in Km" })
  raduis: number;

  // @Field(() => ID, { description: "Location Lat,Lang" })
  // location: string;
}
