import Parse from 'parse';

class FavoriteList extends Parse.Object {
  constructor() {
    super('FavoriteList');
  }
}

Parse.Object.registerSubclass('FavoriteList', FavoriteList);

export default FavoriteList;
