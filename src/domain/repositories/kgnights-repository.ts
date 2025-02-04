// src/users/interfaces/user.repository.interface.ts
import { Document } from 'mongoose';
import { Knight } from '../entities/knight';
import { ICreateKnightDTO } from '../dtos/create-knight-dto';

export abstract class KnightsRepository {
  abstract create({ nickname, attributes, birthday, keyAttribute, name, weapons }: ICreateKnightDTO): Promise<Knight>;
  abstract list(data: ListKnightsDTO): Promise<Knight[]>;
  abstract findByNickname(nickname: string): Promise<Knight | null>;
  abstract findById(id: string): Promise<Knight | null>;
  abstract save(knight: Document<unknown, {}, Knight>): Promise<void>
  abstract update(id: string, knight: Knight): Promise<Knight | null>;
  abstract delete(id: string): Promise<void>;
}
