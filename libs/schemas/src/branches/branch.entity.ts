import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Company } from "../companies";
import { Franchise } from "../franchises";
import { Zone } from "../zones";

export type BranchDocument = Branch & Document;

@Schema()
@ObjectType()
export class Branch {
  @Field()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Franchise",
    autopopulate: true,
  })
  franchise: Franchise = new Franchise();
  @Field()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  })
  company: Company = new Company();
  @Field(() => Zone)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Zone" })
  zone: Zone = new Zone();

  @Field(() => ID, { description: "branch's _id" })
  id!: string;

  @Prop()
  @Field(() => String, { description: "branch's name" })
  name!: string;

  @Prop()
  @Field(() => String, { description: "branch's picture" })
  picture!: string;

  @Prop()
  @Field(() => String, { description: "branch's description" })
  description!: string;

  @Prop()
  @Field(() => String, { description: "branch's opening hour" })
  openAt!: string; // between 0/24//

  @Prop()
  @Field(() => String, { description: "branch closing hour" })
  closeAt!: string; // between 0/24//

  @Prop()
  @Field(() => Boolean, { description: "branch's status" })
  status!: boolean;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

export default {
  schema: BranchSchema,
  name: Branch.name,
};
