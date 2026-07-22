import Parse from 'parse';
import Job from '../models/Job.js';
// gets all jobs from the database and returns the promise array of all job objects
export async function getAllJobs() {
  try{
    const query = new Parse.Query(Job);
    return await query.find();
  } catch (error) {
    console.error('Error while fetching jobs', error);
    return[];
  }
}

// gets jols by location from the database
export async function getJobsByLocation(location) {
  try {
    const query = new Parse.Query(Job);
    query.equalTo('location', location);
    return await query.find();
  } catch (error) {
    console.error(`Error fetching jobs in ${location}:`, error);
    return [];
  }
}

//by sponsership type
export async function getJobsBySponsorshipType(type) {
  try {
    const query = new Parse.Query(Job);
    query.equalTo('sponsorship', type);
    return await query.find();
  } catch (error) {
    console.error(`Error fetching ${type} jobs:`, error);
    return [];
  }
}

// by multiple visa types (visa type filter, e.g. H-1B/OPT/CPT)
// returns all jobs when no types are selected
export async function getJobsBySponsorshipTypes(types) {
  try {
    const query = new Parse.Query(Job);
    if (types && types.length > 0) {
      query.containedIn('visaType', types);
    }
    return await query.find();
  } catch (error) {
    console.error('Error fetching jobs by visa types:', error);
    return [];
  }
}
// by company
export async function getJobsByCompany(company) {
  try {
    const query = new Parse.Query(Job);
    query.equalTo('company', company);
    return await query.find();
  } catch (error) {
    console.error(`Error fetching ${company} jobs:`, error);
    return [];
  }
}

// all remote jobs

export async function getRemoteJobs() {
  try {
    const query = new Parse.Query(Job);
    query.equalTo('remote', true);
    return await query.find();
  } catch (error) {
    console.error('Error fetching remote jobs:', error);
    return [];
  }
}

// by job type
 export async function getJobsByJobType(jobType) {
  try {
    const query = new Parse.Query(Job);
    query.equalTo('jobType', jobType);
    return await query.find();
  } catch (error) {
    console.error(`Error fetching ${jobType} jobs:`, error);
    return [];
  }
}

// searches jobs by keyword in the title

export async function searchJobs(keyword) {
  try {
    const query = new Parse.Query(Job);
    query.contains('title', keyword);
    return await query.find();
  } catch (error) {
    console.error(`Error searching for ${keyword}:`, error);
    return [];
  }
}
// minimum salary

export async function getJobsBySalaryMinimum(minSalary) {
  try {
    const query = new Parse.Query(Job);
    query.greaterThanOrEqualTo('salary', minSalary);
    return await query.find();
  } catch (error) {
    console.error(`Error fetching jobs with salary >= ${minSalary}:`, error);
    return [];
  }
}

// by multiple filters
export async function getJobsWithFilters(filters) {
  try {
    const query = new Parse.Query(Job);
 
    if (filters.location) {
      query.equalTo('location', filters.location);
    }
    if (filters.sponsorship) {
      query.equalTo('sponsorship', filters.sponsorship);
    }
    if (filters.company) {
      query.equalTo('company', filters.company);
    }
    if (filters.remote !== undefined) {
      query.equalTo('remote', filters.remote);
    }
    if (filters.jobType) {
      query.equalTo('jobType', filters.jobType);
    }
 
    return await query.find();
  } catch (error) {
    console.error('Error fetching jobs with filters:', error);
    return [];
  }
}