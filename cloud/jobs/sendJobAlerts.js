// Scheduled Cloud Code job: for every AlertPreference, finds Job postings
// from the last 24 hours that match the user's selected visa types and/or
// keywords, and logs who would be emailed. Real SendGrid delivery is a
// follow-up pass - this only logs matches so the matching logic can be
// verified first.
//
// Registered with Parse.Cloud.job (not .define) because Back4App's
// Background Jobs scheduler and dashboard "Run Now" button only target
// Parse.Cloud.job-registered functions.
Parse.Cloud.job('sendJobAlerts', async (request) => {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // 1. All jobs posted in the last 24 hours
  const jobQuery = new Parse.Query('Job');
  jobQuery.greaterThanOrEqualTo('createdAt', oneDayAgo);
  jobQuery.limit(1000);
  const recentJobs = await jobQuery.find({ useMasterKey: true });

  // 2. All alert preferences
  const preferenceQuery = new Parse.Query('AlertPreference');
  preferenceQuery.include('user');
  preferenceQuery.limit(1000);
  const preferences = await preferenceQuery.find({ useMasterKey: true });

  let totalMatches = 0;

  // 3. Match each preference against the recent jobs
  for (const preference of preferences) {
    const user = preference.get('user');
    if (!user) continue;

    const visaTypes = preference.get('visaTypes') || [];
    const keywords = (preference.get('keywords') || []).map((kw) => kw.toLowerCase());

    // A preference with nothing configured matches nothing, so we don't
    // alert everyone on every job by default.
    if (visaTypes.length === 0 && keywords.length === 0) continue;

    const matches = recentJobs.filter((job) => {
      // equivalent to containedIn('visaType', visaTypes)
      const visaMatch = visaTypes.length === 0 || visaTypes.includes(job.get('visaType'));

      const haystack = `${job.get('title') || ''} ${job.get('description') || ''}`.toLowerCase();
      const keywordMatch = keywords.length === 0 || keywords.some((kw) => haystack.includes(kw));

      return visaMatch && keywordMatch;
    });

    if (matches.length > 0) {
      totalMatches += matches.length;
      const recipient = user.get('email') || user.get('username');
      const titles = matches.map((job) => job.get('title')).join(', ');
      console.log(`Would email ${recipient}: ${matches.length} match(es) - ${titles}`);
    }
  }

  const summary = `sendJobAlerts: checked ${recentJobs.length} recent job(s) against ${preferences.length} preference(s); ${totalMatches} total match(es).`;
  console.log(summary);
  // request.message() surfaces status in the Back4App Job Status view,
  // separate from the Cloud Code Logs that console.log writes to.
  request.message(summary);

  return {
    checkedJobs: recentJobs.length,
    checkedPreferences: preferences.length,
    totalMatches,
  };
});
