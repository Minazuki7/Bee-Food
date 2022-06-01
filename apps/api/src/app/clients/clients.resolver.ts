import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { ClientsService } from "./clients.service";
import { Client } from "./entities/client.entity";
import { CreateClientInput } from "./dto/create-client.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { CreateUserInput } from "../users/dto/create-user.input";

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Mutation(() => Client)
  createClient(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.clientsService.createClient(createUserInput);
  }

  @Query(() => [Client], { name: "clients" })
  findAll() {
    return this.clientsService.findAll();
  }

  @Query(() => Client, { name: "client" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.clientsService.findOne(id);
  }

  @Mutation(() => Client)
  updateClient(
    @Args("id", { type: () => String }) id: string,
    @Args("updateClientInput") updateClientInput: UpdateClientInput
  ) {
    return this.clientsService.update(id, updateClientInput);
  }

  @Mutation(() => Client)
  removeClient(@Args("id", { type: () => ID }) id: string) {
    return this.clientsService.remove(id);
  }
}
