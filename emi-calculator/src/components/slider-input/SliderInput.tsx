import styles from './SilderInput.module.css';
import cn from 'clsx';

interface SliderInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title: string;
  title2: string;
}

const SliderInput = ({ id, title, className, value, size, title2, ...props }: SliderInputProps) => {
  return (
    <div className={styles['input-container']}>
      <label htmlFor={id}>{title}</label>
      <h4>{title2}</h4>
      <input
        size={size}
        value={value}
        className={cn(className, styles.slider)}
        {...props}
        type="range"
        id={id}
      />
      <div className={styles['slider-label']}>
        <span>0%</span>
        <span>{value}%</span>
        <span>{size}%</span>
      </div>
    </div>
  );
};

export default SliderInput;
