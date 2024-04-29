import { format, fromUnixTime } from 'date-fns';
import { JobPost } from '../../lib/types';
import styles from './JobCard.module.css';
import { useEffect, useState } from 'react';
import cn from 'clsx';

type Props = {
  post: JobPost;
};

const JobCard = ({ post }: Props) => {
  const [date, setDate] = useState<string>();

  useEffect(() => {
    setDate(format(fromUnixTime(post.time), 'Pp'));
    return () => {
      setDate(undefined);
    };
  }, []);

  return (
    <div className={styles.card}>
      {post.url ? (
        <a className={styles.card__link} href={post.url} target="_blank" rel="noopener noreferrer">
          <h4 className={cn(styles.card__title, styles['card__title-underline'])}>{post.title}</h4>
        </a>
      ) : (
        <h4 className={cn(styles.card__title)}>{post.title}</h4>
      )}
      <div className={styles.card__body}>
        <span>By {post.by}</span>
        <span>-</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default JobCard;
