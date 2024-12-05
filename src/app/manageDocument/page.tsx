"use client";

// 서류관리 화면
// 담당자(담당 브랜치): yerim

import { useState } from "react";
import MozipLayout from "../mozipFormCreate/MozipLayout/MozipLayout";
import MozipTabs from "../mozipFormCreate/MozipTabs/MozipTabs";
import MozipManageDocument from "./MozipManageBlocks/MozipManageDocument";
import MozipManageInterview from "./MozipManageBlocks/MozipManageInterview";
import MozipManagePassOrFail from "./MozipManageBlocks/MozipManagePassOrFail";
import MozipManageTabs from "./MozipManageTabs/MozipManageTabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("서류 관리");

  const renderContent = () => {
    switch (activeTab) {
      case "서류 관리":
        return <MozipManageDocument onNext={() => setActiveTab("면접 관리")} />;
      case "면접 관리":
        return (
          <MozipManageInterview
            onPrev={() => setActiveTab("서류 관리")}
            onNext={() => setActiveTab("합불 관리")}
          />
        );
      case "합불 관리":
        return (
          <MozipManagePassOrFail onPrev={() => setActiveTab("면접 관리")} />
        );
      default:
        return null;
    }
  };

  return (
    <MozipLayout>
      <MozipManageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </MozipLayout>
  );
}
