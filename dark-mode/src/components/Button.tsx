import React from 'react';
import { Link } from 'react-router-dom';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  extraStyles?: string;
  path: string;
}

const Button = ({ title, extraStyles, path }: Props) => {
  return (
    <Link to={path}>
      <button
        className={`py-4 px-6 rounded-lg uppercase dark:active:bg-green-300 dark:bg-green-200 bg-green-500 active:bg-green-600 flex ${extraStyles}`}
      >
        {title}
      </button>
    </Link>
  );
};

export default Button;
