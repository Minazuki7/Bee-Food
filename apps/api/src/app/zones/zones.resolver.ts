import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { ZonesService } from "./zones.service";
import { Zone } from "./entities/zone.entity";
import { CreateZoneInput } from "./dto/create-zone.input";
import { UpdateZoneInput } from "./dto/update-zone.input";

@Resolver(() => Zone)
export class ZonesResolver {
  constructor(private readonly zonesService: ZonesService) {}

  @Mutation(() => Zone)
  createZone(@Args("createZoneInput") createZoneInput: CreateZoneInput) {
    return this.zonesService.create(createZoneInput);
  }

  @Query(() => [Zone], { name: "zones" })
  findAll() {
    return this.zonesService.findAll();
  }

  @Query(() => Zone, { name: "zone" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.zonesService.findOne(id);
  }

  @Mutation(() => Zone)
  updateZone(
    @Args("id", { type: () => String }) id: string,
    @Args("updateZoneInput") updateZoneInput: UpdateZoneInput
  ) {
    return this.zonesService.update(id, updateZoneInput);
  }

  @Mutation(() => Zone)
  removeZone(@Args("id", { type: () => ID }) id: string) {
    return this.zonesService.remove(id);
  }
}
