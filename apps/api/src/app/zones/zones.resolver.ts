import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";
import { Model } from "mongoose";
import { ZonesService } from "./zones.service";
import { Zone, ZoneDocument } from "@fd-wereact/schemas";
import { CreateZoneInput } from "./dto/create-zone.input";
import { UpdateZoneInput } from "./dto/update-zone.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";
@ObjectType()
export class PaginatedZones extends PaginatedList(Zone) {}
@Resolver(() => Zone)
export class ZonesResolver extends CrudResolver(Zone, PaginatedZones) {
  constructor(
    private readonly zonesService: ZonesService,
    @InjectModel(Zone.name)
    zoneModel: Model<ZoneDocument>
  ) {
    super(zoneModel);
  }

  @Mutation(() => Zone)
  createZone(@Args("createZoneInput") createZoneInput: CreateZoneInput) {
    return this.zonesService.create(createZoneInput);
  }

  @Mutation(() => Zone)
  updateZone(
    @Args("id", { type: () => String }) id: string,
    @Args("updateZoneInput") updateZoneInput: UpdateZoneInput
  ) {
    return this.zonesService.update(id, updateZoneInput);
  }
}
