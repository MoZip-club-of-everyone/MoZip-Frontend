"use client";

import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// 담당자: 나영
// Dropdown Button 컴포넌트입니다.

interface MozipBlockDropdownProps {
	$width?: string;
	$height?: string;
	$padding?: string;
	$margin?: string;
	$bordercolor?: string;
	$borderradius?: string;
	$highlightcolor?: string;
	buttonText: React.ReactNode;
	menuItems: string[];
}

interface DropdownContainerProps {
	$width?: string;
}

const DropdownContainer = styled.div<DropdownContainerProps>`
  position: relative;
  width: ${(props) => props.$width || "100%"};
`;

const DropdownButton = styled.button<Omit<MozipBlockDropdownProps, 'buttonText' | 'menuItems'>>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "5rem"};
  padding: ${(props) => props.$padding || "0.5rem"};
  margin: ${(props) => props.$margin || "0"};
  border: ${(props) => props.$bordercolor || "1.5px solid #D9D9D9"};
  border-radius: ${(props) => props.$borderradius || "0.5rem"};
  background-color: white;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${(props) => props.$highlightcolor || "#8BB9FF"};
  }
`;

const Menu = styled.div<{ $menuWidth?: number; $menuTop?: number; $menuLeft?: number }>`
  position: absolute;
  top: ${({ $menuTop }) => $menuTop || 0}px;
  left: ${({ $menuLeft }) => $menuLeft || 0}px;
  width: ${({ $menuWidth }) => $menuWidth || 100}px;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  z-index: 900;
`;

const MenuItem = styled.label`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const MozipBlockDropdown: React.FC<MozipBlockDropdownProps> = ({
	buttonText,
	menuItems,
	$width,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>(menuItems);
	const [menuPosition, setMenuPosition] = useState({ width: 0, top: 0, left: 0 });
	const buttonRef = useRef<HTMLButtonElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleCheckboxChange = (item: string) => {
		setSelectedItems((prevSelectedItems) =>
			prevSelectedItems.includes(item)
				? prevSelectedItems.filter((i) => i !== item)
				: [...prevSelectedItems, item]
		);
	};

	useEffect(() => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setMenuPosition({
				width: rect.width,
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
			});
		}
	}, [isOpen]);

	return (
		<DropdownContainer $width={$width}>
			<DropdownButton ref={buttonRef} onClick={toggleDropdown} {...props} $width={$width}>
				{buttonText}
			</DropdownButton>
			{isOpen &&
				ReactDOM.createPortal(
					<Menu $menuWidth={menuPosition.width} $menuTop={menuPosition.top} $menuLeft={menuPosition.left}>
						{menuItems.map((item) => (
							<MenuItem key={item}>
								<Checkbox
									type="checkbox"
									checked={selectedItems.includes(item)}
									onChange={() => handleCheckboxChange(item)}
								/>
								{item}
							</MenuItem>
						))}
					</Menu>,
					document.body
				)}
		</DropdownContainer>
	);
};

export default MozipBlockDropdown;
