"use client";

import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";

interface MozipDatePickerProps {
	$width?: string;
	$height?: string;
	$padding?: string;
	$margin?: string;
	$bordercolor?: string;
	$borderradius?: string;
	$highlightcolor?: string;
}

const DatePickerContainer = styled.div<MozipDatePickerProps>`
  display: flex;
  align-items: center;
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "auto"};
  padding: ${(props) => props.$padding || "0.5rem 1rem"};
  margin: ${(props) => props.$margin || "0"};
  border: ${(props) => props.$bordercolor || "1px solid #D9D9D9"};
  border-radius: ${(props) => props.$borderradius || "0.5rem"};
  outline: none;

  &:focus-within {
    border-color: ${(props) => props.$highlightcolor || "#8BB9FF"};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  color: #b0b0b0;
`;

const MozipDatePicker = () => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
			<DatePickerContainer $width="auto" $padding="0.5rem" $borderradius="0.5rem">
				<IconContainer>
					<CiCalendar />
				</IconContainer>
				<DatePicker
					selected={startDate}
					onChange={(date: Date | null) => setStartDate(date)}
					dateFormat="yyyy-MM-dd"
					placeholderText="YYYY-MM-DD"
					className="custom-date-picker"
					onKeyDown={(e) => e.preventDefault()} // 키보드 입력 방지
				/>
			</DatePickerContainer>

			<span>~</span>

			<DatePickerContainer $width="auto" $padding="0.5rem" $borderradius="0.5rem">
				<IconContainer>
					<CiCalendar />
				</IconContainer>
				<DatePicker
					selected={endDate}
					onChange={(date: Date | null) => setEndDate(date)}
					dateFormat="yyyy-MM-dd"
					placeholderText="YYYY-MM-DD"
					className="custom-date-picker"
					onKeyDown={(e) => e.preventDefault()} // 키보드 입력 방지
				/>
			</DatePickerContainer>
		</div>
	);
};

export default MozipDatePicker;
