import { useEffect, useState } from "react";
import styles from "@/styles/exchange-calc.module.css";
import DropdownMenu from "./dropdown-menu";
import SwapButton from "./swap-button";
import ResetButton from "./reset-button";
import LoadingSpinner from "./loading-spinner";
import api from "@/utils/api";

const ExchangeCalculator = () => {
  const initialAmountVal = "1.0";
  const initialCurrencyVal = "Currency";
  const [amount, setAmount] = useState(initialAmountVal);
  const [fromCurrency, setFromCurrency] = useState(initialCurrencyVal);
  const [toCurrency, setToCurrency] = useState(initialCurrencyVal);
  const [exchangeResult, setExchangeResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const swapCurrencies = () => {
    /* React will batch these state updates into a single update so the second updater function will have the old value of fromCurrency */
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const resetAll = () => {
    setAmount(initialAmountVal);
    setFromCurrency(initialCurrencyVal);
    setToCurrency(initialCurrencyVal);
    setExchangeResult("");
  };

  useEffect(() => {
    if (amount && fromCurrency !== "Currency" && toCurrency !== "Currency") {
      const getExchange = async () => {
        console.log("FETCH");
        const res = await api.get("/exchange", { params: { from: fromCurrency, to: toCurrency, q: amount } });
        setExchangeResult(res.data);
      };
      // getExchange();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.menusWrapper}>
          <DropdownMenu label="from" value={fromCurrency} setValue={setFromCurrency} disabledValue={toCurrency} />
          {isLoading ? <LoadingSpinner /> : <SwapButton onClick={swapCurrencies} />}
          <DropdownMenu label="to" value={toCurrency} setValue={setToCurrency} disabledValue={fromCurrency} />
        </div>
        {exchangeResult && (
          <>
            <p className={styles.result}>
              {amount} <span>{fromCurrency}</span> &nbsp;=&nbsp; {exchangeResult} <span>{toCurrency}</span>
            </p>
            <ResetButton onClick={resetAll} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExchangeCalculator;
