// for each of my models
// importing parse
import Parse from 'parse';
// creating a class extending the parse object
class Applications extends Parse.Object{
    constructor(){
        super('Applications');
    }

}

// registering it with parse
Parse.Object.registerSubclass('Applications', Applications);

// exporting so we can use in other files
export default Applications;