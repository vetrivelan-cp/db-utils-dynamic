// import { DynamicModule, Module } from '@nestjs/common';
// import { MongooseModule, MongooseModuleAsyncOptions, MongooseModuleOptions } from '@nestjs/mongoose';
// import { DbUtilsDynamicService } from './db-utils.dynamic.service';

// @Module({
//   providers: [DbUtilsDynamicService],
//   exports: [DbUtilsDynamicService],
// })
// export class DbModule {
//   /**
//    * Register the module with a provided MongoDB connection string.
//    *
//    * Example:
//    * DbModule.register('mongodb://localhost:27017/nestdb')
//    */
//   static register(uri?: string, options: MongooseModuleOptions = {}): DynamicModule {
//     const host = process.env.MONGO_HOST ?? 'localhost';
//     const port = process.env.MONGO_PORT ?? '27017';
//     const dbName = process.env.MONGO_DB_NAME ?? 'nestdb';
//     const envUri = process.env.MONGO_DB ?? `mongodb://${host}:${port}/${dbName}`; 

//     const finalUri = envUri

//     return {
//       module: DbModule,
//       imports: [MongooseModule.forRoot(finalUri, options)],
//     };
//   }

//   /**
//    * Register the module asynchronously (recommended when using ConfigService).
//    */
//   static registerAsync(options: MongooseModuleAsyncOptions): DynamicModule {
//     return {
//       module: DbModule,
//       imports: [MongooseModule.forRootAsync(options)],
//     };
//   }
// }

import { Module ,Global} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbUtilsDynamicService } from './db-utils.dynamic.service';

@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestdb')],
  providers: [DbUtilsDynamicService],
  exports: [DbUtilsDynamicService],
})
export class DbModule {}