import { useEffect, useState } from "react";
import styles from "@/styles/dropdown-menu.module.css";
import api from "@/utils/api";

type MenuListProps = {
  isDropdownOpen: boolean;
  disabledValue: string;
  handleSelectItem: (e: React.BaseSyntheticEvent) => void;
};

const MenuList = ({ isDropdownOpen, disabledValue, handleSelectItem }: MenuListProps) => {
  const [currencyList, setCurrencyList] = useState<string[]>([]);

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
  }, []);

  return (
    <ul className={[styles.menuList, isDropdownOpen && styles.menuListVisible].join(" ")}>
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
  );
};

export default MenuList;
