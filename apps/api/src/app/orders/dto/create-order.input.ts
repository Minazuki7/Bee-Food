import { ID } from "@nestjs/graphql";
import { InputType, Int, Field } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

import { status } from "@fd-wereact/nest-common";
import { Zone } from "../../zones/entities/zone.entity";
import { Driver } from "./../../drivers/entities/driver.entity";
import { Client } from "./../../clients/entities/client.entity";

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @Field(() => ID, { description: "zone's id" })
  zone: Zone;
  @IsNotEmpty()
  @Field(() => ID, { description: "client's id" })
  client: Client;
  @IsNotEmpty()
  @Field(() => ID, { description: "driver's id" })
  driver: Driver;
  @IsNotEmpty()
  @Field(() => Int, { description: "order's price" })
  price: number;

  @IsNotEmpty()
  @Field(() => Int, { description: "order's deliveryprice" })
  deliveryprice: number;
  @IsNotEmpty()
  @Field(() => Int, { description: "order's deliveryFees" })
  deliveryFees: number;
  @IsArray()
  @IsNotEmpty()
  @Field(() => [status], { description: "user's roles" })
  status: status[];
}
