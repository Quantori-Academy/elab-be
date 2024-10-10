import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_REPOSITORY_TOKEN, StorageRepository } from './storage.repository';

@Injectable()
export class StorageService {
  constructor(@Inject(STORAGE_REPOSITORY_TOKEN) storageRepository: StorageRepository) {
    console.log(storageRepository);
  }
}

const STORAGE_SERVICE_TOKEN = Symbol('AUTHSTORAGE_SERVICE_TOKEN_SERVICE_TOKEN');
const StorageServiceProvider = {
  provide: STORAGE_SERVICE_TOKEN,
  useClass: StorageService,
};

export { STORAGE_SERVICE_TOKEN, StorageServiceProvider };
