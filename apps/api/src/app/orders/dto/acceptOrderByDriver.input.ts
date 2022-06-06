import { ID } from "@nestjs/graphql";
import { CreateOrderInput } from "./create-order.input";
import { InputType, PartialType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Driver } from "./../../drivers/entities/driver.entity";


@InputType()
export class AcceptOrderByDriver extends PartialType(CreateOrderInput) {
    @IsNotEmpty()
    @Field(() => ID, { description: "driver's id" ,nullable:true})
    driver?: string;
}

    