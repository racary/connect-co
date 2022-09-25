import * as dao from '../db/dao';
import {publishUpdate,} from '../pubsub';

const getItem = (id: string) => {
  return Promise.resolve(dao.getItem(id));
};

const updateItem = async (body: any) => {
  // update item in db
  await dao.updateItem(body);

  if (body.status === 'completed') {
    // check to see if item status has already been set to completed (separate db)
    const hasItemBeenMarkedCompleted = await dao.hasItemBeenMarkedCompleted(body.id);

    if (!hasItemBeenMarkedCompleted) {
      // if its not already been set to completed emit event with id of item
      await publishUpdate(body.id);

      // update record to indicate status has been set to completed
      await dao.updateItemAsCompleted(body.id);
    }
  }  
};

export {
  getItem,
  updateItem,
};