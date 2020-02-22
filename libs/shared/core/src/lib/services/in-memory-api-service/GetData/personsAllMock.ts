import {IGetData} from '../igetData.interface';

export class PersonsAllMock implements IGetData {
    getData(payload: any, db?: any): any {
        const personsDb = db['personsDb'];
        return personsDb;
    }
}