import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ZonesService } from './zones.service';
import { Zone } from './entities/zone.entity';
import { CreateZoneInput } from './dto/create-zone.input';
import { UpdateZoneInput } from './dto/update-zone.input';

@Resolver(() => Zone)
export class ZonesResolver {
  constructor(private readonly zonesService: ZonesService) {}

  @Mutation(() => Zone)
  createZone(@Args('createZoneInput') createZoneInput: CreateZoneInput) {
    return this.zonesService.create(createZoneInput);
  }

  @Query(() => [Zone], { name: 'zones' })
  findAll() {
    return this.zonesService.findAll();
  }

  @Query(() => Zone, { name: 'zone' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.zonesService.findOne(id);
  }

  @Mutation(() => Zone)
  updateZone(@Args('updateZoneInput') updateZoneInput: UpdateZoneInput) {
    return this.zonesService.update(updateZoneInput.id, updateZoneInput);
  }

  @Mutation(() => Zone)
  removeZone(@Args('id', { type: () => Int }) id: number) {
    return this.zonesService.remove(id);
  }
}
