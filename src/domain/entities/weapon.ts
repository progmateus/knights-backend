import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Knight } from './knight';

export type WeaponDocument = HydratedDocument<Weapon>;

@Schema()
export class Weapon {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  mod: number;

  @Prop()
  attribute: string;

  @Prop()
  equipped: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Knight' }] })
  knights?: Knight[];
}

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
