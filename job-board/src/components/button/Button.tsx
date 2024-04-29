import styles from './Button.module.css';
import cn from 'clsx';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

const Button = ({ text, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(styles.btn, className)} {...props}>
      {text}
    </button>
  );
};

export default Button;
