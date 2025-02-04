import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { KnightsRepository } from '../repositories/kgnights-repository';

@Injectable()
export class DeleteKnightUseCase {
  constructor(
    private readonly knightsRepository: KnightsRepository
  ) { }

  async execute(id: string): Promise<void> {

    const knight = await this.knightsRepository.findById(id);

    if (!knight) {
      throw new NotFoundException();
    }

    if (knight.isHero) {
      throw new ConflictException();
    }
    knight.isHero = true;

    await this.knightsRepository.update(id, knight);
  }
}
