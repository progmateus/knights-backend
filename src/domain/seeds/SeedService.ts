import { Injectable } from '@nestjs/common';
import { WeaponsRepository } from '../repositories/weapons-repository';

@Injectable()
export class SeedService {
  constructor(private readonly weaponsRepository: WeaponsRepository) { }

  async seed(): Promise<void> {
    const users = await this.weaponsRepository.list();
    if (users.length > 0) {
      console.log('Os dados já estão populados.');
      return;
    }

    const weapons = [
      {
        name: 'knife',
        attribute: "strength",
        mod: 0,
        equipped: false
      }, {
        name: 'sword',
        attribute: "strength",
        mod: +2,
        equipped: false
      }, {
        name: 'field',
        attribute: "constitution",
        mod: -1,
        equipped: false
      }, {
        name: 'potion',
        attribute: "wisdom",
        mod: -2,
        equipped: false
      }, {
        name: 'spear',
        attribute: "strength",
        mod: +2,
        equipped: false
      }, {
        name: 'posion',
        attribute: "strength",
        mod: +2,
        equipped: false
      }
    ]

    await Promise.all([
      weapons.map(async (weapon) => {
        await this.weaponsRepository.create(weapon)
      })
    ])
    console.log('Dados de seed criados com sucesso!');
  }
}