import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Button from './components/button/Button';
import JobCard from './components/job-card/JobCard';
import { JobPost } from './lib/types';
import { fetchAllJobs, fetchJobById } from './lib/api';
import Spinner from './components/spinner/Spinner';

const App = () => {
  const [jobs, setJobs] = useState<number[]>([]);
  const [jobsInView, setJobsInView] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMoreJobs = async (count: number = 5, allJobIds: number[], allJobsInView: JobPost[]) => {
    if (!allJobIds) return;

    const start = allJobsInView.length;

    const end = Math.min(allJobIds.length, start + count);

    if (end <= start) return;

    setLoading(true);

    const jobIds = allJobIds.slice(start, end);

    const fetchedJobs: JobPost[] = [];

    for (let i = 0; i < end; i++) {
      const job = await fetchJobById(jobIds[i]);
      if (job) fetchedJobs.push(job);
    }

    setJobsInView(() => [...allJobsInView, ...fetchedJobs]);

    setLoading(false);
  };

  useEffect(() => {
    fetchAllJobs().then(resp => {
      setJobs(resp || []);

      if (resp && jobsInView.length === 0) {
        setTimeout(() => loadMoreJobs(5, resp, jobsInView), 2000);
      }
    });

    return () => {
      setJobs([]);
      setJobsInView([]);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hacker New Job Board</h1>
      {jobsInView.map((post, index) => (
        <JobCard key={index} post={post} />
      ))}

      {jobs.length > 0 &&
        jobsInView.length < jobs.length &&
        (loading ? (
          <Spinner />
        ) : (
          <Button onClick={() => loadMoreJobs(5, jobs, jobsInView)} text="Load more jobs" />
        ))}
    </div>
  );
};

export default App;
