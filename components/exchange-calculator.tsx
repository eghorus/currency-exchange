import { useEffect, useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import styles from "@/styles/exchange-calculator.module.css";
import AmountInput from "./amount-input";
import DropdownMenu from "./dropdown-menu/dropdown-menu";
import SwapButton from "./swap-button";
import LoadingSpinner from "./loading-spinner";
import Result from "./result";
import ResetButton from "./reset-button";
import api from "@/utils/api";

const ExchangeCalculator = () => {
  const initialAmountVal = "1.0";
  const initialCurrencyVal = "Currency";
  const [amount, setAmount] = useState(initialAmountVal);
  const [hasTimeoutElapsed, setHasTimeoutElapsed] = useState(true);
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
    if (amount && hasTimeoutElapsed && fromCurrency !== initialCurrencyVal && toCurrency !== initialCurrencyVal) {
      const getExchange = async () => {
        try {
          setIsLoading(true);
          const res = await api.get("/exchange", { params: { from: fromCurrency, to: toCurrency } });
          setIsLoading(false);
          setExchangeResult(res.data);
        } catch (error) {
          setIsLoading(false);
          window.alert(error);
        }
      };
      getExchange();
    }
  }, [amount, hasTimeoutElapsed, fromCurrency, toCurrency]);

  return (
    <div className={styles.card}>
      <div className={styles.logo}>
        <GiMoneyStack />
      </div>

      <div className={styles.content}>
        <div className={styles.inputsContainer}>
          <AmountInput value={amount} setValue={setAmount} setHasTimeoutElapsed={setHasTimeoutElapsed} />
          <DropdownMenu label="from" value={fromCurrency} setValue={setFromCurrency} disabledValue={toCurrency} />
          {isLoading ? <LoadingSpinner /> : <SwapButton onClick={swapCurrencies} />}
          <DropdownMenu label="to" value={toCurrency} setValue={setToCurrency} disabledValue={fromCurrency} />
        </div>

        {/* Show the result text and the reset button only when there is a result received from the API */}
        {exchangeResult && (
          <>
            {/* Hide the result text when the user get a result then start changing the amount input */}
            {hasTimeoutElapsed && (
              <Result
                amount={amount}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                exchangeResult={exchangeResult}
                showLoadingText={isLoading}
              />
            )}
            <ResetButton onClick={resetAll} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExchangeCalculator;
