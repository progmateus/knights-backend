import { Module } from '@nestjs/common';
import { KnightModule } from './domain/knights.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, KnightModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
