import Parse from 'parse';

class Applications extends Parse.Object{
    constructor(){
        super('Applicatoins');
    }

}

Parse.Object.registerSubclass('Applications', Applications);


export default Applications;