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
  const [filter, setFilter] = useState("");
  const filteredCurrencyList = currencyList.filter((c) => c.toLowerCase().startsWith(filter));

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
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
  }, []);

  return (
    <ul className={[styles.menuList, isDropdownOpen && styles.menuListVisible].join(" ")}>
      <input
        type="search"
        placeholder="Search ..."
        aria-label="Search currencies"
        className={styles.filterInput}
        value={filter}
        onChange={handleFilterChange}
      />
      {filteredCurrencyList.map((currency) => (
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
