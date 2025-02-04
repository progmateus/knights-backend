// src/users/interfaces/user.repository.interface.ts
import { Document } from 'mongoose';
import { Weapon } from '../entities/weapon';

export abstract class WeaponsRepository {
  abstract create(data: Omit<Weapon, "_id">): Promise<Weapon>;
  abstract list(): Promise<Weapon[]>;
  abstract findById(id: string): Promise<Weapon | null>;
  abstract save(weapon: Document<Weapon>): Promise<void>
  abstract update(id: string, weapon: Weapon): Promise<Weapon | null>;
  abstract delete(id: string): Promise<void>;
}
