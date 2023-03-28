import styles from "@/styles/reset-button.module.css";

type ResetButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Reset
    </button>
  );
};

export default ResetButton;
