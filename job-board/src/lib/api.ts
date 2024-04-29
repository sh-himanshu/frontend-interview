import { JobPost } from './types';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export const fetchAllJobs = async () => {
  try {
    const resp = await fetch(`${baseUrl}/jobstories.json`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await resp.json();
    return data as number[];
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobById = async (jobId: number) => {
  try {
    const resp = await fetch(`${baseUrl}/item/${jobId}.json`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await resp.json();
    return data as JobPost;
  } catch (error) {
    console.log(error);
  }
};
