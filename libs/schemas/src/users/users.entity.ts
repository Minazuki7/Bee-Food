import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ROLES } from "@fd-wereact/nest-common";

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID, { description: "user's _id" })
  id!: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "user's email" })
  email!: string;

  @Prop()
  @Field(() => String, { description: "user's First name" })
  firstName!: string;

  @Prop()
  @Field(() => String, { description: "user's last name" })
  lastName!: string;

  @Prop()
  @Field(() => String, { description: "user's password" })
  password!: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "user's phone number" })
  phone!: string;

  @Prop({ type: "string", enum: ROLES })
  @Field(() => ROLES, { description: "user's roles" })
  role!: ROLES;

  @Prop()
  @Field(() => Boolean, { description: "user's status" })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export default {
  schema: UserSchema,
  name: User.name,
};
