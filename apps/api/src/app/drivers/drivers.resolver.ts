/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";

import { CreateUserInput } from "./../users/dto/create-user.input";
import { DriversService } from "./drivers.service";
import { Driver, DriverDocument } from "@fd-wereact/schemas";

import {
  CrudResolver,
  CurrentUser,
  PaginatedList,
  PaginationArgs,
  SkipAuth,
} from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";
import { GraphQLError } from "graphql";
import { UpdateUserInput } from "../users/dto/update-user.input";
import { UpdateDriverInput } from "./dto/update-driver.input";
import { isEmpty } from "lodash";

@ObjectType()
export class PaginatedDrivers extends PaginatedList(Driver) {}
@Resolver(() => Driver)
export class DriversResolver extends CrudResolver(Driver, PaginatedDrivers) {
  constructor(
    private readonly driversService: DriversService,
    @InjectModel(Driver.name)
    driverModel: Model<DriverDocument>
  ) {
    super(driverModel);
  }

  @Mutation(() => Driver)
  @SkipAuth()
  createDriver(
    @Args("createUserInput") createUserInput: CreateUserInput,
    @Args("zone", { type: () => String }) zone: string,
    @Args("company", { type: () => String }) company: string
  ) {
    return this.driversService.createDriver(createUserInput, zone, company);
  }

  @Mutation(() => String, { name: "removeDriver" })
  async removeOneById(@Args("id", { type: () => ID }) id?: string) {
    if (id) {
      const doc = await this.driversService.findOne(id);
      if (!doc) {
        throw new GraphQLError("This dodcument doesn't exsit");
      }
      await this.driversService.disable(id);
      return doc._id;
    }
    throw new GraphQLError("You must enter one or more identifier(s)");
  }

  @Query(() => PaginatedDrivers, { name: "ActiveDriversAccounts" })
  async FindActiveDriversAccounts(
    @Args("pagination", { type: () => PaginationArgs, nullable: true })
    args: PaginationArgs
  ) {
    const {
      perPage = -1,
      page = 1,
      sort: sortArgs,
      order,
      ...rest
    } = args || { perPage: -1, page: 1 };
    let count = 0;
    if (isEmpty(rest)) {
      count = await this.model.estimatedDocumentCount(rest);
    } else {
      count = await this.model.find(rest).countDocuments();
    }
    const sort = sortArgs ? { [sortArgs]: order || -1 } : { updatedAt: -1 };
    const preResult =
      perPage > 0
        ? this.model
            .find(rest)
            .sort(sort)
            .skip(perPage * (page - 1))
            .limit(perPage)
        : this.model.find(rest).sort(sort);
    const drivers = await this.driversService.findAllActive();
    return {
      data: drivers,
      count,
      perPage: perPage === -1 ? count : perPage,
      page,
      totalPages: Math.ceil(count / perPage),
    };
  }

  @Query(() => Driver, { name: "driverByPhone" })
  findfindByPhoneOne(@Args("phone", { type: () => String }) phone: string) {
    return this.driversService.findByPhone(phone);
  }

  @Mutation(() => Driver)
  updateDriver(
    @Args("id", { type: () => ID }) id: string,
    @Args("UpdateDriverInput") UpdateDriverInput: UpdateDriverInput
  ) {
    return this.driversService.updateDriverInfo(id, UpdateDriverInput);
  }

  @Mutation(() => Driver, { name: "updateDriverStatus" })
  updateStatus(@CurrentUser() driver: Driver) {
    return this.driversService.updateStatus(driver);
  }
}
