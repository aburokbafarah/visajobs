import Parse from 'parse';

class Company extends Parse.Object{
    constructor(){
        super('Company');
    }
}
Parse.Object.registerSubclass('Company',Company);

export default Company;