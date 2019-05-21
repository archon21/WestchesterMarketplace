import { db } from '../utilities/firebase';

const READ_DB = 'READ_DB';

const defaultState = {ads: []};

const readDB = (field, data) => ({ type: READ_DB,  field, data });

export const willReadDB = field => async dispatch => {
  try {
    console.log(field);

    const collection = db.collection(field);

    const data = await collection.get().then(snapshots => {
      const dataArr = [];
      snapshots.forEach(snapshot => dataArr.push(snapshot.data()));
      return dataArr;
    });

    dispatch(readDB(field, data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case READ_DB:
      return { ...state, [action.field]: action.data };
    default:
      return state;
  }
}
