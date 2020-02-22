import {IGetData} from '../igetData.interface';
import { Person } from '../../../models/ui.model';
import {of, throwError} from 'rxjs';

export class PersonsGetMock implements IGetData {
    getData(payload: any, db?: any): any {
        const personsDb: Person[] = db['personsDb'];
        const requestedId = parseInt(payload.req.body, 10);
        const found = personsDb.find(r => r.id === requestedId);
        const response = found ? of(found) : throwError('No Person was found!');
        return response;
    }
}