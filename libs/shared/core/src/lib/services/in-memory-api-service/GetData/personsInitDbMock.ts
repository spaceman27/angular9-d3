import {IGetData} from '../igetData.interface';
import { Person } from '../../../models/ui.model';

export class PersonsInitDb implements IGetData {
    getData(payload: any, db?: any): any {
        const personsInitialDb: Person[] = [
            {
                id: 1,
                name: 'Frank',
                age: 34,
                weight: 150,
                friends: [
                    { id: 2 }
                ]
            },
            {
                id: 2,
                name: 'Mary',
                age: 34,
                weight: 150,
                friends: [
                    { id: 3 },
                    { id: 4 }
                ]
            },
            {
                id: 3,
                name: 'Tom',
                age: 34,
                weight: 150,
                friends: []
            },
            {
                id: 4,
                name: 'Julie',
                age: 34,
                weight: 150,
                friends: [
                    { id: 3 },
                    { id: 1 }
                ]
            }
        ];

        return personsInitialDb;
    }
}