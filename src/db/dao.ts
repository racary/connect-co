import db1 from './db1';
import db2 from './db2';

interface ItemType {
  age: number,
  city?: string,
  customer?: {
    firstName: string,
    lastName: string,
  },
  firstName?: string,
  id: string,
  state?: string
  lastName?: string,
  location?: {
    city: string,
    state: string,
  },
}


export const getItem = async (id: string) => {
  let item: ItemType = (db1 as any)[id] || (db2 as any)[id];
  let formatedItem = {};

  if (item) {
    const customer = {
      age: item.age,
      firstName: item.firstName || item.customer.firstName,
      lastName: item.lastName || item.customer.firstName,
    };
    const location = {
      city: item.city || item.location.city,
      state: item.state || item.location.state,
    };

    formatedItem = {
      id: item.id,
      customer,
      location,
    };
  }

  return formatedItem;
};

export const updateItem = async (body: any) => {
  return Promise.resolve(body);
};

export const hasItemBeenMarkedCompleted = async (id: string) => {
  
  console.log(id);
  return Math.round(Math.random()) === 0 ? Promise.resolve(true) : Promise.resolve(false);
};
export const updateItemAsCompleted = async (id: string) => {
  
  console.log(id);
};