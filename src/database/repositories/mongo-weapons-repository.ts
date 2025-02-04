// src/users/interfaces/user.repository.interface.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Weapon } from 'src/domain/entities/weapon';
import { WeaponsRepository } from 'src/domain/repositories/weapons-repository';

@Injectable()
export class MongoWeaponsRepository implements WeaponsRepository {
  constructor(@InjectModel('Weapon') private readonly weaponModel: Model<Weapon>) { }


  async create(weapon: Weapon): Promise<Weapon> {
    const newUser = new this.weaponModel(weapon);
    return newUser.save();
  }

  async list(): Promise<Weapon[]> {
    return this.weaponModel.find().populate('knights').exec();
  }

  async findById(id: string): Promise<Weapon | null> {
    return this.weaponModel.findById(id).exec();
  }

  async update(id: string, weapon: Weapon): Promise<Weapon | null> {
    return this.weaponModel.findByIdAndUpdate(id, weapon, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.weaponModel.findByIdAndDelete(id).exec();
  }

  async save(weapon: Document<Weapon>): Promise<void> {
    weapon.save();
  }
}
