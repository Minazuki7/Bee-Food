import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";
import { ClientsService } from "./clients.service";
import { Client, ClientDocument } from "@fd-wereact/schemas";
import { CreateClientInput } from "./dto/create-client.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { CreateUserInput } from "../users/dto/create-user.input";
import {
  CrudResolver,
  PaginatedList,
  PaginationArgs,
  SkipAuth,
} from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";
import { GraphQLError } from "graphql";
import { isEmpty } from "lodash";

@ObjectType()
export class PaginatedClients extends PaginatedList(Client) {}
@Resolver(() => Client)
export class ClientsResolver extends CrudResolver(Client, PaginatedClients) {
  constructor(
    private readonly clientsService: ClientsService,
    @InjectModel(Client.name)
    clientModel: Model<ClientDocument>
  ) {
    super(clientModel);
  }
  @SkipAuth()
  @Mutation(() => Client)
  createClient(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.clientsService.createClient(createUserInput);
  }

  @Query(() => PaginatedClients, { name: "ActiveClientsAccounts" })
  async FindActiveClientsAccounts(
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
    const clients = await this.clientsService.findAllActive();
    return {
      data: clients,
      count,
      perPage: perPage === -1 ? count : perPage,
      page,
      totalPages: Math.ceil(count / perPage),
    };
  }

  @Mutation(() => String, { name: "removeClient" })
  async removeOneById(@Args("id", { type: () => ID }) id: string) {
    if (id) {
      const doc = await this.clientsService.findOne(id);
      if (!doc) {
        throw new GraphQLError("This dodcument doesn't exsit");
      }
      await this.clientsService.disable(id);
      return doc._id;
    }
    throw new GraphQLError("You must enter one or more identifier(s)");
  }
  @Mutation(() => Client)
  updateClient(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateClientInput") updateClientInput: UpdateClientInput
  ) {
    return this.clientsService.updateClientInfo(id, updateClientInput);
  }
  @SkipAuth()
  @Query(() => Client)
  findClientByUserID(@Args("id", { type: () => ID }) id: string) {
    return this.clientsService.findClientByUserID(id);
  }
}
