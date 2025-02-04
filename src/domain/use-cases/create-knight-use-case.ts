import { Injectable } from '@nestjs/common';
import { KnightsRepository } from '../repositories/kgnights-repository';
import { Either, right } from 'src/shared/either';
import { Knight } from '../entities/knight';

import { AttributesRepository } from '../repositories/attributes-repository';
import { Weapon } from '../entities/weapon';
import { WeaponsRepository } from '../repositories/weapons-repository';
import { ICreateKnightDTO } from '../dtos/create-knight-dto';

type CreateKnightUseCaseResponse = Either<
  null,
  {
    knight: Knight
  }
>
@Injectable()
export class CreateKnightUseCase {
  constructor(
    private readonly knightsRepository: KnightsRepository,
    private readonly attributesRepository: AttributesRepository
  ) { }

  async execute({ name, nickname, birthday, keyAttribute, attributes, weapons }: ICreateKnightDTO): Promise<CreateKnightUseCaseResponse> {

    const attribute = await this.attributesRepository.create({
      strength: attributes.strength,
      dexterity: attributes.dexterity,
      constitution: attributes.constitution,
      intelligence: attributes.intelligence,
      wisdom: attributes.wisdom,
      charisma: attributes.charisma
    })

    const knight = await this.knightsRepository.create({
      name,
      nickname,
      birthday,
      keyAttribute,
      attributes: attribute,
      weapons
    });

    return right({
      knight
    });
  }
}
