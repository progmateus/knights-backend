import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Attribute } from './attribute';
import { Weapon } from './weapon';

export type KnightDocument = HydratedDocument<Knight>;

@Schema()
export class Knight {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop()
  birthday: Date;

  @Prop()
  keyAttribute: string;

  @Prop()
  isHero: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' })
  attributes: Attribute;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' }] })
  weapons?: Weapon[];
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
