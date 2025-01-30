import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import MozipDatePicker from "../../components/MozipDatePicker";

interface MozipSettingDateProps {
	onChangeStartDate: (date: string | null) => void;
	onChangeEndDate: (date: string | null) => void;
}

export default function MozipSettingDate({
	onChangeStartDate,
	onChangeEndDate,
}: MozipSettingDateProps) {
	return (
		<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
			<CustomRow $gap="0">
				<CustomFont $color="red" $font="1rem" $fontweight="bold">*</CustomFont>
				<CustomFont $color="black" $font="1rem" $fontweight="bold">
					모집날짜
				</CustomFont>
			</CustomRow>
			<MozipDatePicker
				onChangeStartDate={onChangeStartDate}
				onChangeEndDate={onChangeEndDate}
			/>
		</CustomColumn>
	);
}
