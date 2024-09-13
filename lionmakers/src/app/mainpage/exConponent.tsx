"use client";

import CustomBox from "@/components/CustomBox";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function Ex_Conponent() {

    return (
        <CustomColumn gap="4rem" width='100%'>
            <CustomRow width='100%' justifycontent="flex-start">
                <CustomBox width='50%' height='10vh' backgroundcolor="green">
                    <CustomFont color='white' font='1rem'>
                        화면에 들어갈 컴포넌트는 이렇게 분리해주세요
                    </CustomFont>
                </CustomBox>
            </CustomRow>

            <CustomRow width='100%' justifycontent="flex-end">
                <CustomBox width='50%' height='10vh' backgroundcolor="green">
                    <CustomFont color='white' font='1rem'>
                        만들어둔 공통 컴포넌트(components 폴더 아래)를 적극 재활용해주세요
                    </CustomFont>
                </CustomBox>
            </CustomRow>
        </CustomColumn>
    );
}