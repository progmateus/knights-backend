import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Knight, KnightSchema } from './entities/knight';
import { KnightController } from 'src/http/controllers/knight.controller';
import { CreateKnightUseCase } from './use-cases/create-knight-use-case';
import { KnightsRepository } from './repositories/kgnights-repository';
import { MongoKnightsRepository } from 'src/database/repositories/mongo-kgnights-repository';
import { ListKnightsUseCase } from './use-cases/list-knights-use-case';
import { Attribute, AttributeSchema } from './entities/attribute';
import { Weapon, WeaponSchema } from './entities/weapon';
import { AttributesRepository } from './repositories/attributes-repository';
import { MongoAttributesrepository } from 'src/database/repositories/mongo-attributes-repository';
import { WeaponsRepository } from './repositories/weapons-repository';
import { MongoWeaponsRepository } from 'src/database/repositories/mongo-weapons-repository';
import { WeaponController } from 'src/http/controllers/weapon.controller';
import { CreateWeaponUseCase } from './use-cases/create-weapon-use-case';
import { ListWeaponsUseCase } from './use-cases/list-weapons-use-case';
import { UpdateKnightUseCase } from './use-cases/update-knight-use-case';
import { DeleteKnightUseCase } from './use-cases/delete-knight-use-case';
import { GetKnightUseCase } from './use-cases/get-knight-use-case';
import { SeedService } from './seeds/SeedService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Knight.name, schema: KnightSchema },
      { name: Attribute.name, schema: AttributeSchema },
      { name: Weapon.name, schema: WeaponSchema }
    ]),
  ],
  controllers: [KnightController, WeaponController],
  providers: [
    CreateKnightUseCase,
    ListKnightsUseCase,
    CreateWeaponUseCase,
    ListWeaponsUseCase,
    UpdateKnightUseCase,
    DeleteKnightUseCase,
    GetKnightUseCase,
    SeedService,
    {
      provide: KnightsRepository,
      useClass: MongoKnightsRepository,
    },
    {
      provide: AttributesRepository,
      useClass: MongoAttributesrepository,
    },
    {
      provide: WeaponsRepository,
      useClass: MongoWeaponsRepository,
    }
  ]
})
export class KnightModule { }
