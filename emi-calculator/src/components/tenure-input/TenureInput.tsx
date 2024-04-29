import styles from './TenureInput.module.css';
import cn from 'clsx';

type Props = {
  months: number[];
  title: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  id?: string;
};

const TenureInput = ({ months, title, id, value, setValue }: Props) => {
  return (
    <div id={id} className={styles['tenure-input']}>
      <h4 className={styles['tenure-input__title']}>{title}</h4>
      <div className={styles['tenure-input__button-container']}>
        {months.map((item, index) => (
          <button
            onClick={() => setValue(item)}
            key={index}
            className={cn(styles['tenure-input__button'], {
              [styles['tenure-input__button-selected']]: value === item,
            })}
          >
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TenureInput;
