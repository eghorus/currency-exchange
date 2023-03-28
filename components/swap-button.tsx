import { MdCompareArrows } from "react-icons/md";
import styles from "@/styles/swap-button.module.css";

type SwapButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <button id="swap-button" aria-label="Swap selected currencies" className={styles.button} onClick={onClick}>
      <MdCompareArrows className={styles.compareIcon} />
    </button>
  );
};

export default SwapButton;
