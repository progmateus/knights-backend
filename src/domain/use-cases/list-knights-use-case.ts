import { Controller, Get } from '@nestjs/common';
import { KnightsRepository } from '../repositories/kgnights-repository';
import { plainToClass } from 'class-transformer';
import { KnightMapper } from '../mappers/knight-mapper';
import { Either, right } from 'src/shared/either';
import { Knight } from '../entities/knight';


type ListKnightUseCaseResponse = Either<
  null,
  {
    knights: Knight[]
  }
>


@Controller()
export class ListKnightsUseCase {
  constructor(
    private readonly knightsRepository: KnightsRepository
  ) { }

  async execute({ heroes, page, search }: ListKnightsDTO): Promise<ListKnightUseCaseResponse> {

    if (!page || page < 1) page = 1;

    var skip = (page - 1) * 20;

    var knights = await this.knightsRepository.list({ heroes, page, search, skip });

    const knightTeste = plainToClass(KnightMapper, knights, { enableCircularCheck: true });

    return right({
      knights: knightTeste
    });

  }
}
