import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWeaponUseCase } from 'src/domain/use-cases/create-weapon-use-case';
import { ListWeaponsUseCase } from 'src/domain/use-cases/list-weapons-use-case';

@Controller("weapons")
export class WeaponController {
  constructor(
    private readonly createWeaponUseCase: CreateWeaponUseCase,
    private readonly listWeaponsUseCase: ListWeaponsUseCase
  ) { }

  @Post()
  async create(@Body() data: ICreateWeaponDTO) {
    const result = await this.createWeaponUseCase.execute(data);

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const weapon = result.value.weapon

    return { data: weapon }
  }

  @Get()
  async list(): Promise<any[]> {
    return await this.listWeaponsUseCase.execute()
  }
}
