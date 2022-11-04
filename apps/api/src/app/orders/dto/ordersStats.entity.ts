import { ObjectType, Field } from "@nestjs/graphql";

import { User } from "@fd-wereact/schemas";
import { Occurrence } from "./occurrence.entity";

@ObjectType()
export class OrderStats {
  @Field(() => [Occurrence], { description: "" })
  items: Occurrence[];
  @Field(() => [Occurrence], { description: "" })
  menus: Occurrence[];
  @Field(() => [Occurrence], { description: "" })
  clients: Occurrence[];
  @Field(() => [Occurrence], { description: "" })
  branchs: Occurrence[];
}
