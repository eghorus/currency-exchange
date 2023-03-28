import styles from "@/styles/result.module.css";

type ResultProps = {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  exchangeResult: string;
  showLoadingText: boolean;
};

const Result = ({ amount, fromCurrency, toCurrency, exchangeResult, showLoadingText }: ResultProps) => {
  return (
    <p className={styles.result}>
      {showLoadingText ? (
        "Loading ..."
      ) : (
        <>
          {amount} <span>{fromCurrency}</span> &nbsp;=&nbsp; {Number(exchangeResult) * Number(amount)}{" "}
          <span>{toCurrency}</span>
        </>
      )}
    </p>
  );
};

export default Result;
