import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import styles from "@/styles/dropdown-menu.module.css";
import api from "@/utils/api";

type DropdownMenuProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabledValue: string;
};

const DropdownMenu = ({ label, value, setValue, disabledValue }: DropdownMenuProps) => {
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /* To give the button element a unique id and use it as htmlFor attribute on label */
  const buttonId = `${label}Currency`;
  /* To determine click event on any element outside this container */
  const containerElRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSelectItem = (e: React.BaseSyntheticEvent) => {
    setValue(e.target.dataset.value);
    setIsMenuOpen(false);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (!containerElRef.current?.contains(e.target as HTMLElement)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const getCurrencyList = async () => {
      try {
        const res = await api.get("/listquotes");
        setCurrencyList(res.data);
      } catch (error) {
        window.alert(error);
      }
    };
    getCurrencyList();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerElRef}>
      <label htmlFor={buttonId} className="label">
        {label}
      </label>
      <button id={buttonId} className={styles.menuButton} onClick={toggleMenu}>
        {value}
        <span className={[styles.chevronIcon, isMenuOpen && styles.chevronIconInverted].join(" ")}>
          <BiChevronDown />
        </span>
      </button>
      <ul className={[styles.menuList, isMenuOpen && styles.menuOpen].join(" ")}>
        {currencyList.map((currency) => (
          <li
            key={currency}
            className={[styles.menuItem, currency === disabledValue && styles.disabledMenuItem].join(" ")}
            data-value={currency}
            onClick={handleSelectItem}
          >
            {currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
