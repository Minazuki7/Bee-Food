import { InputType, Field, ID } from "@nestjs/graphql";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

@InputType()
export class CreateBranchInput {
  @IsNotEmpty()
  @Field(() => String, { description: "branch's name" })
  name: string;

  @IsNotEmpty()
  @Field(() => ID, { description: "branch's franchise" })
  franchise: string;
  @IsNotEmpty()
  @Field(() => ID, { description: "branch's company" })
  company: string;
  @IsNotEmpty()
  @Field(() => ID, { description: "branch's zone" })
  zone: string;

  @IsOptional()
  @Field(() => String, { description: "branch's picture", nullable: true })
  picture?: string;

  @IsNotEmpty()
  @Field(() => String, { description: "branch's description" })
  description: string;

  @IsString()
  @Length(5)
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g) //not working idk why
  @Field(() => String, { description: "branch's opening hour" })
  openAt: string;

  @IsString()
  @Length(5)
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g) //not working idk why
  @Field(() => String, { description: "branch closing hour" })
  closeAt: string;

  @IsBoolean()
  @Field(() => Boolean, { description: "branch's status" })
  status: boolean;
}
