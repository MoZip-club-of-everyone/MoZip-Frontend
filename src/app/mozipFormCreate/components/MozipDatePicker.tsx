"use client";

import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";

interface MozipDatePickerProps {
	onChangeStartDate: (date: string | null) => void;
	onChangeEndDate: (date: string | null) => void;
}

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  outline: none;

  &:focus-within {
    border-color: #8bb9ff;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  color: #b0b0b0;
`;

const MozipDatePicker: React.FC<MozipDatePickerProps> = ({
	onChangeStartDate,
	onChangeEndDate,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleStartDateChange = (date: Date | null) => {
		setStartDate(date);
		onChangeStartDate(
			date
				? `${date.toISOString().split("T")[0]}T${new Date().toLocaleTimeString("en-US", {
					hour12: false,
				})}`
				: null
		);
	};

	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date);
		onChangeEndDate(
			date
				? `${date.toISOString().split("T")[0]}T${new Date().toLocaleTimeString("en-US", {
					hour12: false,
				})}`
				: null
		);
	};

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
			<DatePickerContainer>
				<IconContainer>
					<CiCalendar />
				</IconContainer>
				<DatePicker
					selected={startDate}
					onChange={handleStartDateChange}
					dateFormat="yyyy-MM-dd"
					placeholderText="YYYY-MM-DD"
					className="custom-date-picker"
					onKeyDown={(e) => e.preventDefault()} // 키보드 입력 방지
				/>
			</DatePickerContainer>

			<span>~</span>

			<DatePickerContainer>
				<IconContainer>
					<CiCalendar />
				</IconContainer>
				<DatePicker
					selected={endDate}
					onChange={handleEndDateChange}
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
