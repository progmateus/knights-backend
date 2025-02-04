// src/users/interfaces/user.repository.interface.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Attribute } from 'src/domain/entities/attribute';
import { AttributesRepository } from 'src/domain/repositories/attributes-repository';

@Injectable()
export class MongoAttributesrepository implements AttributesRepository {
  constructor(@InjectModel('Attribute') private readonly attributeModel: Model<Attribute>) { }


  async create({ charisma, constitution, dexterity, intelligence, strength, wisdom, knight }: Partial<Attribute>): Promise<Attribute> {
    const newUser = new this.attributeModel({
      charisma, constitution, dexterity, intelligence, strength, wisdom, knight
    });
    return newUser.save();
  }

  async list(): Promise<Attribute[]> {
    return this.attributeModel.find().exec();
  }

  async findById(id: string): Promise<Attribute | null> {
    return this.attributeModel.findById(id).exec();
  }

  async update(id: string, attribute: Attribute): Promise<Attribute | null> {
    return this.attributeModel.findByIdAndUpdate(id, attribute, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.attributeModel.findByIdAndDelete(id).exec();
  }

  async save(attribute: Document<Attribute>): Promise<void> {
    attribute.save();
  }
}
