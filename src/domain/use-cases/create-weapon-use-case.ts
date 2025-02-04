import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/shared/either';

import { Weapon } from '../entities/weapon';
import { WeaponsRepository } from '../repositories/weapons-repository';

type CreateWeaponUseCaseResponse = Either<
  null,
  {
    weapon: Weapon
  }
>
@Injectable()
export class CreateWeaponUseCase {
  constructor(
    private readonly weaponsRepository: WeaponsRepository
  ) { }

  async execute({ name, attribute, equipped, mod }: ICreateWeaponDTO): Promise<CreateWeaponUseCaseResponse> {


    var weapon = await this.weaponsRepository.create({
      name, attribute, equipped, mod
    });

    return right({
      weapon
    });
  }
}
