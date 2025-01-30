import React, { useState } from "react";
import styled from "styled-components";

interface Option {
  id: string;
  label: string;
  checked: boolean;
}

interface DropdownProps {
  title: string;
  options: Option[];
  searchable?: boolean;
}

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  width: 192px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
`;

const CheckboxList = styled.ul`
  list-style: none;
  padding: 8px;
  margin: 0;
`;

const CheckboxItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Dropdown: React.FC<DropdownProps> = ({ title, options, searchable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>(
    options.filter((opt) => opt.checked).map((opt) => opt.label)
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleCheckboxChange = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // 검색어가 포함된 옵션만 필터링
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {title}: {selected.length > 0 ? selected.join(", ") : "선택하세요"} ▼
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {searchable && (
            <SearchInput
              type="text"
              placeholder="검색..."
              value={searchTerm}
              onChange={handleSearch}
            />
          )}
          <CheckboxList>
            {filteredOptions.map((option) => (
              <CheckboxItem key={option.id}>
                <Checkbox
                  type="checkbox"
                  id={option.id}
                  checked={selected.includes(option.label)}
                  onChange={() => handleCheckboxChange(option.label)}
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </CheckboxItem>
            ))}
          </CheckboxList>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
