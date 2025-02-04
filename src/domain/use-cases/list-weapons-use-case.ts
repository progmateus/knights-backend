import { Controller, Get } from '@nestjs/common';
import { WeaponsRepository } from '../repositories/weapons-repository';

@Controller()
export class ListWeaponsUseCase {
  constructor(
    private readonly weaponsRepository: WeaponsRepository
  ) { }

  async execute(): Promise<any[]> {
    return await this.weaponsRepository.list();
  }
}
