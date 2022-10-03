import type IPerson from '@/interfaces/IPerson';
import personData from '../stores/personData.json';

export const getPersonData = (): Promise<IPerson[]> => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve(personData);
        }, 500);
    });
}

