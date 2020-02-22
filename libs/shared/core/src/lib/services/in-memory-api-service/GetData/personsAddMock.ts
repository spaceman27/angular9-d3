import { IGetData } from '../igetData.interface';
import { Person } from '../../../models/ui.model';
import { throwError } from 'rxjs';

export class PersonsAddMock implements IGetData {
    getData(payload: any, db?: any): any {
        const data = payload.req.body as Person;
        const personsDb = db['personsDb'];
        const alreadyExist = personsDb.find(item => item.name === data.name);
        if (alreadyExist) {
          return throwError('Person already exist');
        }

        const currentMaxId = Math.max.apply(Math, personsDb.map(function(item: any) { return item.id; }));

        
        let newPerson = Object.assign({
          id: currentMaxId + 1
        }, data);
        personsDb.push(newPerson);
        return newPerson;
    }
}
