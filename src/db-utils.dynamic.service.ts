import { Injectable } from '@nestjs/common';
import { Model, PipelineStage } from 'mongoose';

/**
 * Option B: stateless dynamic DB utils.
 *
 * Pass the mongoose model on each call.
 * This avoids having one DBUtilsService instance per model.
 */
@Injectable()
export class DbUtilsDynamicService {
  /**
   * Save a document instance.
   *
   * Note: `Model` does not have a `.save()` method; documents do.
   * If you want to save arbitrary data, use `create()` instead.
   */
  saveDoc<T>(doc: any): Promise<T> {
    return doc.save();
  }

  create<T>(model: Model<T>, data: any): Promise<T> {
    return model.create(data);
  }

  find<T>(
    model: Model<T>,
    filter: object = {},
    projection: object = {},
    populate: any = undefined,
    sort: any = undefined,
    skip = 0,
    limit = 0,
    setOption: object = {},
  ): Promise<T[]> {
    // Keep behavior close to typical mongoose usage
    let q: any = model.find(filter, projection);
    if (populate) q = q.populate(populate);
    if (sort) q = q.sort(sort);
    if (skip) q = q.skip(skip);
    if (limit) q = q.limit(limit);
    if (setOption && Object.keys(setOption).length) q = q.setOptions(setOption);
    return q.exec();
  }

  findOne<T>(
    model: Model<T>,
    filter: object = {},
    projection: object = {},
    populate: any = undefined,
    sort: any = undefined,
    limit = 0,
    lean = false,
  ) {
    let q: any = model.findOne(filter, projection);
    if (populate) q = q.populate(populate);
    if (sort) q = q.sort(sort);
    if (limit) q = q.limit(limit);
    if (lean) q = q.lean();
    return q.exec();
  }

  findById<T>(
    model: Model<T>,
    id: string | object,
    projection: object = {},
    populate: any = undefined,
    setOption: object = {},
  ) {
    let q: any = model.findById(id, projection);
    if (populate) q = q.populate(populate);
    if (setOption && Object.keys(setOption).length) q = q.setOptions(setOption);
    return q.exec();
  }

  bulkWrite<T>(model: Model<T>, operations: any[], options: object = {}): Promise<any> {
    return model.bulkWrite(operations, options as any);
  }

  updateOne<T>(model: Model<T>, find: object, data: object, options: object = {}) {
    return model.updateOne(find, data, options as any).exec();
  }

  findOneAndUpdate<T>(
    model: Model<T>,
    find: object,
    data: object,
    options: object = {},
    populate: any = undefined,
  ) {
    let q: any = model.findOneAndUpdate(find, data, options as any);
    if (populate) q = q.populate(populate);
    return q.exec();
  }

  findByIdAndUpdate<T>(
    model: Model<T>,
    find: string | object,
    data: object = {},
    options: object = {},
    populate: any = undefined,
  ) {
    let q: any = model.findByIdAndUpdate(find as any, data, options as any);
    if (populate) q = q.populate(populate);
    return q.exec();
  }

  countDocuments<T>(model: Model<T>, filter: object = {}, options: object = {}): Promise<number> {
    return model.countDocuments(filter, options as any).exec();
  }

  insertMany<T>(model: Model<T>, docs: T[]): Promise<any[]> {
    return model.insertMany(docs);
  }

  deleteOne<T>(model: Model<T>, filter: object): Promise<any> {
    return model.deleteOne(filter as any).exec();
  }

  deleteMany<T>(model: Model<T>, filter: object): Promise<any> {
    return model.deleteMany(filter as any).exec();
  }

  updateMany<T>(model: Model<T>, filter: object, data: object, options: object = {}): Promise<any> {
    return model.updateMany(filter as any, data, options as any).exec();
  }

  aggregate<T>(model: Model<T>, pipeline: PipelineStage[]): Promise<T[]> {
    return model.aggregate(pipeline).exec();
  }
}
