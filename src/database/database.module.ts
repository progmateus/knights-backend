import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightModule } from 'src/domain/knights.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    KnightModule,
  ]
})
export class DatabaseModule { }