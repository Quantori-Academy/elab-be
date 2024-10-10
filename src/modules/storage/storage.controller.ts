import { Controller, Inject } from '@nestjs/common';
import { STORAGE_SERVICE_TOKEN } from './storage.service';
import { ApiTags } from '@nestjs/swagger';
import { IStorageService } from './interfaces/storageService.interface';

const ROUTE = 'storage';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class StorageController {
  constructor(@Inject(STORAGE_SERVICE_TOKEN) storageService: IStorageService) {
    console.log(storageService);
  }
}
