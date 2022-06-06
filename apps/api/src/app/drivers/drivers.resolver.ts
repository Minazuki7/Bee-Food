import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";

import { CreateUserInput } from "./../users/dto/create-user.input";
import { DriversService } from "./drivers.service";
import { Driver } from "./entities/driver.entity";
import { CreateDriverInput } from "./dto/create-driver.input";
import { UpdateDriverInput } from "./dto/update-driver.input";

@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => Driver)
  createDriver(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.driversService.createDriver(createUserInput);
  }

  @Query(() => [Driver], { name: "drivers" })
  findAll() {
    return this.driversService.findAll();
  }

  @Query(() => Driver, { name: "driver" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.driversService.findOne(id);
  }

  
  @Query(() => Driver, { name: "driverByPhone" })
  findfindByPhoneOne(@Args("phone", { type: () => String }) phone: string) {
    return this.driversService.findByPhone(phone);
  }

  @Mutation(() => Driver)
  updateDriver(
    @Args("id", { type: () => String }) id: string,
    @Args("updateDriverInput") updateDriverInput: UpdateDriverInput
  ) {
    return this.driversService.update(id, updateDriverInput);
  }

  @Mutation(() => Driver)
  removeDriver(@Args("id", { type: () => ID }) id: string) {
    return this.driversService.remove(id);
  }
}
