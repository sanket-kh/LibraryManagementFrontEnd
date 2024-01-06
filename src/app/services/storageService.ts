import {afterRender, Inject, inject, Injectable, InjectionToken} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn:"root"
})
export class storageService{

  constructor(private document:Document, private sessionStorage:Storage) {
    afterRender(()=>{
      this.sessionStorage = this.document.defaultView?.sessionStorage as Storage;
    })
  }


}
