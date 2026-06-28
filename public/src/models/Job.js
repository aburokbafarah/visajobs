import Parse from 'Parse';

class Job extends Parse.Object{
    constructor(){
        super('Job');

    }
}

Parse.Object.registerSubclass('Job', Job);

export default Job;