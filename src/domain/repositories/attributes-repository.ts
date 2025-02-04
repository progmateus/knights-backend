// src/users/interfaces/user.repository.interface.ts
import { Document } from 'mongoose';
import { Attribute } from '../entities/attribute';

export abstract class AttributesRepository {
  abstract create({ charisma, constitution, dexterity, intelligence, strength, wisdom, knight }: Omit<Attribute, "_id">): Promise<Attribute>;
  abstract list(): Promise<Attribute[]>;
  abstract findById(id: string): Promise<Attribute | null>;
  abstract save(attribute: Document<Attribute>): Promise<void>
  abstract update(id: string, attribute: Attribute): Promise<Attribute | null>;
  abstract delete(id: string): Promise<void>;
}
