import Parse from 'parse';
import * as env from '../environments.js';

Parse.initialize(env.APPLICATION_ID, env.JAVASCRIPT_KEY);
Parse.serverURL = env.SERVER_URL;

// Enables Parse.Query#subscribe() for real-time updates (see Jobs.jsx). Set
// VITE_PARSE_LIVE_QUERY_URL to this app's Back4App LiveQuery URL (found in
// the Back4App dashboard under Server Settings > Security & Keys /
// Live Query) - left unset, subscribe() will fail to connect.
if (env.LIVE_QUERY_SERVER_URL) {
  Parse.liveQueryServerURL = env.LIVE_QUERY_SERVER_URL;
}

export default Parse;