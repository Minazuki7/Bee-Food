import { ObjectType, Field } from "@nestjs/graphql";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { User } from "@fd-wereact/schemas";

export type RefreshTokenDocument = RefreshToken & Document;

@ObjectType()
export class RefreshToken {
  @Prop({ /*required: true, index: true */ required: false })
  @Field(() => String, { description: "Refresh token" })
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @Prop()
  @Field(() => Date)
  expires: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
