import Parse from 'parse';

class AlertPreference extends Parse.Object {
  constructor() {
    super('AlertPreference');
  }
}

Parse.Object.registerSubclass('AlertPreference', AlertPreference);

export default AlertPreference;
