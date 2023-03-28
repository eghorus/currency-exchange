import { useEffect, useRef, useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
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
  /* To determine click event on any element outside this wrapper */
  const wrapperElRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSelectItem = (e: React.BaseSyntheticEvent) => {
    setValue(e.target.dataset.value);
    setIsMenuOpen(false);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (!wrapperElRef.current?.contains(e.target as HTMLElement)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const getCurrencyList = async () => {
      const res = await api.get("/listquotes");
      setCurrencyList(res.data);
    };
    getCurrencyList();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperElRef}>
      <label htmlFor={buttonId} className={styles.label}>
        {label}
      </label>
      <button id={buttonId} className={styles.menuButton} onClick={toggleMenu}>
        {value}
        <span className={styles.chevronIcon} tabIndex={-1}>
          {isMenuOpen ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
        </span>
      </button>
      <ul className={[styles.menu, isMenuOpen && styles.menuOpen].join(" ")}>
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
