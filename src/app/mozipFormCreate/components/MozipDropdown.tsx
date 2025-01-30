"use client";

import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

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
	onSelect?: (value: string) => void; // onSelect prop 추가
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

const MenuItem = styled.div`
	padding: 0.5rem 1rem;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		background-color: #f0f0f0;
	}
`;

const MozipBlockDropdown: React.FC<MozipBlockDropdownProps> = ({
	buttonText,
	menuItems,
	$width,
	onSelect, // onSelect prop
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ width: 0, top: 0, left: 0 });
	const buttonRef = useRef<HTMLButtonElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleItemClick = (item: string) => {
		if (onSelect) {
			onSelect(item); // 선택한 값을 onSelect 콜백에 전달
		}
		setIsOpen(false); // 드롭다운 닫기
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
							<MenuItem key={item} onClick={() => handleItemClick(item)}>
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
