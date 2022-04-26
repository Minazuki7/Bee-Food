import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Franchise } from "../../franchises/entities/franchise.entity";

export type BranchDocument = Branch & Document;

@Schema()
@ObjectType()
export class Branch {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Franchise",
    autopopulate: true,
  })
  franchise: Franchise;

  @Field(() => ID, { description: "branch's _id" })
  id: string;

  @Prop()
  @Field(() => String, { description: "branch's name" })
  name: string;

  @Prop()
  @Field(() => String, { description: "branch's picture" })
  picture: string;

  @Prop()
  @Field(() => String, { description: "branch's description" })
  description: string;

  @Prop()
  @Field(() => String, { description: "branch's opening hour" })
  openAt: string; // between 0/24//

  @Prop()
  @Field(() => String, { description: "branch closing hour" })
  closeAt: string; // between 0/24//

  @Prop()
  @Field(() => Boolean, { description: "branch's status" })
  status: boolean;
}
export const BranchSchema = SchemaFactory.createForClass(Branch);
