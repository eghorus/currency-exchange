import { useEffect, useRef, useState } from "react";
import styles from "@/styles/dropdown-menu.module.css";
import MenuButton from "./menu-button";
import MenuList from "./menu-list";

type DropdownMenuProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabledValue: string;
};

const DropdownMenu = ({ label, value, setValue, disabledValue }: DropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /* To determine click event on any element outside this container */
  const containerElRef = useRef<HTMLDivElement>(null);

  const handleSelectItem = (e: React.BaseSyntheticEvent) => {
    setValue(e.target.dataset.value);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!containerElRef.current?.contains(e.target as HTMLElement)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerElRef}>
      <MenuButton
        menuLabel={label}
        buttonText={value}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <MenuList isDropdownOpen={isDropdownOpen} disabledValue={disabledValue} handleSelectItem={handleSelectItem} />
    </div>
  );
};

export default DropdownMenu;
