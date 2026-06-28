import Parse from 'parse';


class User extends Parse.Object{
    constructor(){
        super('User');
    }
}
Parse.Object.registerSubclass('User',User);

export default User;