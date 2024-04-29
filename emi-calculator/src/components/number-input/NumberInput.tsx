import styles from './NumberInput.module.css';

interface NumberInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title: string;
}

const NumberInput = ({ id, title, ...props }: NumberInputProps) => {
  return (
    <div className={styles['input-container']}>
      <label htmlFor={id}>{title}</label>
      <input {...props} type="number" id={id} />
    </div>
  );
};

export default NumberInput;
