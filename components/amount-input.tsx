import styles from "@/styles/amount-input.module.css";

type AmountInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setHasTimeoutElapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

let timerId: number;

const AmountInput = ({ value, setValue, setHasTimeoutElapsed }: AmountInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* At the start of input change event handler, hasTimeoutElapsed state should be false, so we do the following:
        1. clear any previous timer to stop it from setting hasTimeoutElapsed to true
        2. Explicitly set the hasTimeoutElapsed to false
    */
    window.clearTimeout(timerId);
    setHasTimeoutElapsed(false);

    const value = e.target.value;
    /* Allow input only if it is a valid number */
    if (!isNaN(Number(value))) {
      setValue(value);
    }

    /* At the end of input change event handler, start the timer to set the hasTimeoutElapsed to true after 2s */
    timerId = window.setTimeout(() => setHasTimeoutElapsed(true), 2000);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    /* Auto select the default value for a better user experience */
    e.target.value === "1.0" && e.target.select();
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="amountInput" className="label">
        Amount
      </label>
      <input
        id="amountInput"
        className={styles.input}
        placeholder="0.0"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default AmountInput;
