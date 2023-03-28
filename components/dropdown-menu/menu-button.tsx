import { BiChevronDown } from "react-icons/bi";
import styles from "@/styles/dropdown-menu.module.css";

type MenuButtonProps = {
  menuLabel: string;
  buttonText: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuButton = ({ menuLabel, buttonText, isDropdownOpen, setIsDropdownOpen }: MenuButtonProps) => {
  const buttonId = `${menuLabel}Currency`; // The id will be fromCurrency or toCurrency

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <label htmlFor={buttonId} className="label">
        {menuLabel}
      </label>
      <button id={buttonId} className={styles.menuButton} onClick={toggleDropdown}>
        {buttonText}
        <span className={[styles.chevronIcon, isDropdownOpen && styles.chevronIconInverted].join(" ")}>
          <BiChevronDown />
        </span>
      </button>
    </>
  );
};

export default MenuButton;
