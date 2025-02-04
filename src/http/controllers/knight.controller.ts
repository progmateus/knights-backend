import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ICreateKnightDTO } from 'src/domain/dtos/create-knight-dto';
import { Knight } from 'src/domain/entities/knight';
import { CreateKnightUseCase } from 'src/domain/use-cases/create-knight-use-case';
import { DeleteKnightUseCase } from 'src/domain/use-cases/delete-knight-use-case';
import { GetKnightUseCase } from 'src/domain/use-cases/get-knight-use-case';
import { ListKnightsUseCase } from 'src/domain/use-cases/list-knights-use-case';
import { UpdateKnightUseCase } from 'src/domain/use-cases/update-knight-use-case';

@Controller("knights")
export class KnightController {
  constructor(
    private readonly createKnightUsecase: CreateKnightUseCase,
    private readonly listKnighstUsecase: ListKnightsUseCase,
    private readonly updateKnightUseCase: UpdateKnightUseCase,
    private readonly deleteKnightUseCase: DeleteKnightUseCase,
    private readonly getKnightUseCase: GetKnightUseCase
  ) { }

  @Post()
  async create(@Body() createKnightDto: ICreateKnightDTO) {
    const result = await this.createKnightUsecase.execute(createKnightDto);

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const knight = result.value.knight

    return { data: knight }
  }

  @Get()
  async list(
    @Query('heroes') heroes: boolean,
    @Query('page') page: number,
    @Query('search') search: string
  ) {
    const result = await this.listKnighstUsecase.execute({ heroes, page, search })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const knights = result.value.knights

    return { data: knights }
  }

  @Get(":id")
  async get(
    @Param('id') id: string
  ) {
    const result = await this.getKnightUseCase.execute(id)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const knight = result.value.knight

    return { data: knight }
  }

  @Put(":id")
  async update(
    @Param('id') id: string,
    @Body() createKnightDto: Pick<ICreateKnightDTO, "nickname">
  ) {
    const result = await this.updateKnightUseCase.execute(id, createKnightDto)

  }


  @Delete(":id")
  @HttpCode(204)
  async delete(
    @Param('id') id: string,
  ) {
    await this.deleteKnightUseCase.execute(id);

    return {
      messsage: 'deleted'
    }
  }
}
