import { Injectable } from '@angular/core';
import {
   getStatusText,
   InMemoryDbService,
   ResponseOptions,
   RequestInfo,
   STATUS,
   RequestInfoUtilities,
   ParsedRequestUrl
} from 'angular-in-memory-web-api';
import { Person } from '../../models/ui.model';
import { ApiService } from '../api-service/api-service';
import { PersonsInitDb } from './GetData/personsInitDbMock';
import { PersonsAllMock } from './GetData/personsAllMock';
import { PersonsAddMock } from './GetData/personsAddMock';
import { PersonsGetMock } from './GetData/personsGetMock';

const postMethodGetDataRepo = {
   'PersonsAdd': new PersonsAddMock(),
   'PersonsGet': new PersonsGetMock()
};

const getMethodGetDataRepo = {
   'PersonsAll': new PersonsAllMock()
};

@Injectable(
   { providedIn: 'root'}
)
export class InMemoryWebApiService implements InMemoryDbService {
   private db: any;

   createDb(reqInfo?: RequestInfo) {
      const personsDb = new PersonsInitDb().getData(reqInfo);

        this.db = { personsDb };
        return this.db;
   }

   // HTTP GET interceptor
   get(reqInfo: RequestInfo) {
      if (getMethodGetDataRepo.hasOwnProperty(reqInfo.collectionName)) {
          return this.handleRequest(reqInfo, getMethodGetDataRepo);
      }

      return undefined; // let the default GET handle all others
  }

  // HTTP GET interceptor
  post(reqInfo: RequestInfo) {
      if (postMethodGetDataRepo.hasOwnProperty(reqInfo.collectionName)) {
          return this.handleRequest(reqInfo, postMethodGetDataRepo);
      }

      return undefined; // let the default POST handle all others
  }

  // HTTP POST interceptor handles requests
  private handleRequest(reqInfo: RequestInfo, dataRepo: any) {
      return reqInfo.utils.createResponse$(() => {
          const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
          const data = dataRepo[reqInfo.collectionName].getData(reqInfo, this.db);

          const options: ResponseOptions = data ?
              {
                  body: dataEncapsulation ? {data} : data,
                  status: STATUS.OK
              } :
              {
                  body: {error: `'Not found`},
                  status: STATUS.NOT_FOUND
              };
          return this.finishOptions(options, reqInfo);
      });
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
      options.statusText = getStatusText(options.status);
      options.headers = headers;
      options.url = url;
      return options;
  }

  // parseRequestUrl override
  // Do this to manipulate the request URL or the parsed result
  // into something your data store can handle.
  // This example turns a request for `/foo/heroes` into just `/heroes`.
  // It leaves other URLs untouched and forwards to the default parser.
  // It also logs the result of the default parser.
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
      if (url.endsWith('.json')) {
          return utils.parseRequestUrl(url);
      }

      const splitted = url.split('/');
      const isLastArgumentIsId = Number.isInteger(parseInt(splitted[splitted.length - 1], 10));
      const collectionIndex = isLastArgumentIsId ? splitted.length - 3 : splitted.length - 2;
      const actionIndex = isLastArgumentIsId ? splitted.length - 2 : splitted.length - 1;

      const collectionName = splitted[collectionIndex] + splitted[actionIndex];

      //   const newUrl = splitted.join('/');
      const parsed = utils.parseRequestUrl(url);
      parsed.apiBase = ApiService.BASE_PATH;
      parsed.collectionName = collectionName;
      parsed.id = isLastArgumentIsId ? splitted[splitted.length - 1] as any : '';
      parsed.resourceUrl = parsed.resourceUrl + parsed.collectionName;
      return parsed;
  }
}