import Parse from 'parse';

class Favorite extends Parse.Object {
  constructor() {
    super('Favorite');
  }
}

Parse.Object.registerSubclass('Favorite', Favorite);

export default Favorite;
