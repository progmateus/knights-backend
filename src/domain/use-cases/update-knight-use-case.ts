import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { KnightsRepository } from '../repositories/kgnights-repository';
import { Either, right } from 'src/shared/either';
import { Knight } from '../entities/knight';

import { ICreateKnightDTO } from '../dtos/create-knight-dto';

type UpdateKnightUseCaseResponse = Either<
  null,
  {
    knight: Knight
  }
>
@Injectable()
export class UpdateKnightUseCase {
  constructor(
    private readonly knightsRepository: KnightsRepository
  ) { }

  async execute(id, { nickname }: Pick<ICreateKnightDTO, "nickname">): Promise<UpdateKnightUseCaseResponse> {

    const knight = await this.knightsRepository.findById(id);

    if (!knight) {
      throw new NotFoundException();
    }

    const nicknameAlreadyExists = await this.knightsRepository.findByNickname(nickname);

    if (nicknameAlreadyExists) {
      throw new ConflictException();
    }

    knight.nickname = nickname;

    await this.knightsRepository.update(id, knight);

    return right({
      knight
    });
  }
}
