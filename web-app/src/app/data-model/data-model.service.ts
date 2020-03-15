import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  temporarySharedCodeModel: string = ""

  storeTemporarySharedCode(code: string) {
    this.temporarySharedCodeModel = code

    console.log("Save: \n" + this.temporarySharedCodeModel)
  }

  getTemporarySharedCode(): string {
    return this.temporarySharedCodeModel;
  }
}
