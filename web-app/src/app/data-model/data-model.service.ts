import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  temporarySharedCodeModel: string = ""
  sideNavContent: any


  storeTemporarySharedCode(code: string) {
    this.temporarySharedCodeModel = code

    console.log("Save: \n" + this.temporarySharedCodeModel)
  }

  getTemporarySharedCode(): string {
    return this.temporarySharedCodeModel;
  }

  storeSideNavContent(sideNavContent: any) {
    this.sideNavContent = sideNavContent
  }

  getSideNavContent(): any {
    return this.sideNavContent;
  }
}
