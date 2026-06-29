import Parse from 'parse';
import * as env from '../environments.js';

Parse.initialize(env.APPLICATION_ID, env.JAVASCRIPT_KEY);
Parse.serverURL = env.SERVER_URL;

export default Parse;