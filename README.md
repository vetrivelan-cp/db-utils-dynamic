# @vetrivelan-cp/db-utils-dynamic

A small, stateless set of MongoDB/Mongoose utility helpers for **NestJS**, exposed as a dynamic service where you pass the `mongoose` model on every call.

- Built for NestJS + Mongoose
- Stateless utilities (no per-model service instances)
- Typed exports (`dist/index.d.ts`)

## Features

- CRUD helpers: `create`, `find`, `findOne`, `findById`
- Update helpers: `updateOne`, `updateMany`, `findOneAndUpdate`, `findByIdAndUpdate`
- Delete helpers: `deleteOne`, `deleteMany`
- Bulk/aggregate helpers: `bulkWrite`, `aggregate`
- `countDocuments`, `insertMany`

## Tech

This package uses:

- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/)

## Installation

### 1) Peer dependencies

This library declares peer dependencies. Make sure your app has compatible versions installed:

- `mongoose` `^8.0.0`
- `@nestjs/common` `^10 || ^11`
- `@nestjs/core` `^10 || ^11`

### 2) Install the package (GitHub Packages)

This package is published to **GitHub Packages**.

1. Ensure you have an auth token with `read:packages`.
2. Configure npm to use GitHub registry for your scope (example):

```ini
# .npmrc
@vetrivelan-cp:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_GITHUB_TOKEN>
```

3. Install:

```bash
npm i @vetrivelan-cp/db-utils-dynamic
```

## Usage

### Import the module

> Note: `DbModule` currently connects using a hard-coded connection string:
> `mongodb://localhost:27017/nestdb`
>
> In most production apps you will typically inject your own `MongooseModule.forRoot(...)` in the AppModule and only use the service from this package.

```ts
import { Module } from '@nestjs/common';
import { DbModule } from '@vetrivelan-cp/db-utils-dynamic';

@Module({
  imports: [DbModule],
})
export class AppModule {}
```

### Use the service with any Mongoose model

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbUtilsDynamicService } from '@vetrivelan-cp/db-utils-dynamic';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DbUtilsDynamicService,
    @InjectModel('User') private readonly userModel: Model<any>,
  ) {}

  async listActiveUsers() {
    return this.db.find(this.userModel, { active: true }, {}, undefined, { createdAt: -1 });
  }

  async createUser(dto: any) {
    return this.db.create(this.userModel, dto);
  }

  async updateEmail(id: string, email: string) {
    return this.db.findByIdAndUpdate(
      this.userModel,
      id,
      { $set: { email } },
      { new: true },
    );
  }
}
```

## API

Exports:

- `DbUtilsDynamicService`
- `DbModule`

### DbUtilsDynamicService

Methods (high-level):

- `saveDoc<T>(doc)`
- `create<T>(model, data)`
- `find<T>(model, filter?, projection?, populate?, sort?, skip?, limit?, setOption?)`
- `findOne<T>(model, filter?, projection?, populate?, sort?, limit?, lean?)`
- `findById<T>(model, id, projection?, populate?, setOption?)`
- `bulkWrite<T>(model, operations, options?)`
- `updateOne<T>(model, find, data, options?)`
- `findOneAndUpdate<T>(model, find, data, options?, populate?)`
- `findByIdAndUpdate<T>(model, find, data?, options?, populate?)`
- `countDocuments<T>(model, filter?, options?)`
- `insertMany<T>(model, docs)`
- `deleteOne<T>(model, filter)`
- `deleteMany<T>(model, filter)`
- `updateMany<T>(model, filter, data, options?)`
- `aggregate<T>(model, pipeline)`

## Development

Build the package:

```bash
npm run build
```

This runs:

- `rimraf dist && tsc`

## Publish

Publishing runs a build automatically:

```bash
npm publish
```

(`prepublishOnly` triggers `npm run build`.)

## Repository

- https://github.com/vetrivelan-cp/db-utils-microservice

## License

ISC
