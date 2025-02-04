import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Knight } from './knight';

export type AttributeDocument = HydratedDocument<Attribute>;

@Schema()
export class Attribute {
  _id: string;

  @Prop({
    default: 0
  })
  strength: number;

  @Prop({
    default: 0
  })
  dexterity: number;

  @Prop({
    default: 0
  })
  constitution: number;

  @Prop({
    default: 0
  })
  intelligence: number;

  @Prop({
    default: 0
  })
  wisdom: number;

  @Prop({
    default: 0
  })
  charisma: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Knight' })
  knight?: Knight;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
