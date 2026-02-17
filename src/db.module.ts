import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbUtilsDynamicService } from './db-utils.dynamic.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestdb')],
  providers: [DbUtilsDynamicService],
  exports: [DbUtilsDynamicService],
})
export class DbModule {}
