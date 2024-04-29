import { useState } from 'react';
import { updateButtonState } from '../../lib/api';
import Spinner from '../spinner/Spinner';
import { FaRegHeart } from 'react-icons/fa6';
import cn from 'clsx';
import styles from './LikeButton.module.css';

interface LikeButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
}

const LikeButton = ({ text }: LikeButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState('');

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    const resp = await updateButtonState(liked ? 'unlike' : 'like');

    if (resp.success) {
      setLiked(!liked);
    } else if (resp.message) {
      showError(resp.message);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        className={cn(styles['like-button'], {
          [styles['like-button-active']]: liked,
          [styles['like-button-loading']]: loading,
        })}
        onClick={handleClick}
      >
        {loading ? <Spinner /> : <FaRegHeart className={styles['like-button__icon']} />}
        <span>{text}</span>
      </button>

      <div>{error}</div>
    </>
  );
};

export default LikeButton;
