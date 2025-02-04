// src/users/interfaces/user.repository.interface.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, ObjectId, QueryOptions } from 'mongoose';
import { Document, Model } from 'mongoose';
import { ICreateKnightDTO } from 'src/domain/dtos/create-knight-dto';
import { Knight } from 'src/domain/entities/knight';
import { KnightsRepository } from 'src/domain/repositories/kgnights-repository';

@Injectable()
export class MongoKnightsRepository implements KnightsRepository {
  constructor(@InjectModel('Knight') private readonly knightModel: Model<Knight>) { }


  async create({ name, nickname, birthday, attributes, keyAttribute, weapons }: ICreateKnightDTO): Promise<Knight> {
    const newUser = new this.knightModel({
      name, nickname, birthday, attributes, keyAttribute, weapons
    });
    return newUser.save();
  }

  async list({ heroes, search = "", skip = 0 }: ListKnightsDTO): Promise<Knight[]> {
    const filter: QueryOptions = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { nickname: { $regex: search, $options: 'i' } }
      ]
    };

    if (heroes) {
      filter.isHero = true
    }

    return this.knightModel.find(filter)
      .populate(['attributes', 'weapons'])
      .skip(skip)
      .limit(20)
      .exec();
  }

  async findById(id: string): Promise<Knight | null> {
    return this.knightModel.findById(id).populate(['attributes', 'weapons']).exec();
  }

  async findByNickname(nickname: string): Promise<Knight | null> {
    return await this.knightModel.findOne({
      nickname
    }).exec();
  }

  async update(id: string, knight: Knight): Promise<Knight | null> {
    return this.knightModel.findByIdAndUpdate(id, knight, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.knightModel.findByIdAndDelete(id).exec();
  }

  async save(knight: Document<unknown, {}, Knight>): Promise<void> {
    knight.save();
  }
}
