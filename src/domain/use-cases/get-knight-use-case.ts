import { Injectable, NotFoundException } from '@nestjs/common';
import { KnightsRepository } from '../repositories/kgnights-repository';
import { Either, right } from 'src/shared/either';
import { plainToClass, plainToInstance } from 'class-transformer';
import { KnightMapper } from '../mappers/knight-mapper';
import { Knight } from '../entities/knight';


type GetKnightUseCaseResponse = Either<
  null,
  {
    knight: Knight
  }
>


@Injectable()
export class GetKnightUseCase {
  constructor(
    private readonly knightsRepository: KnightsRepository
  ) { }

  async execute(id: string): Promise<GetKnightUseCaseResponse> {

    const knight = await this.knightsRepository.findById(id);

    if (!knight) {
      throw new NotFoundException();
    }
    const knightTeste = plainToClass(KnightMapper, knight, { enableCircularCheck: true });

    return right({
      knight: knightTeste
    });
  }
}
