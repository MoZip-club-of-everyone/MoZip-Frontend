"use client";

import { useState } from "react";
import MozipManageDocument from "./manageDocument/page";
import ManageInterview from "./manageInterview/page";
import ManagePassOrFail from "./managePassOrFail/page";
import MozipLayout from "../mozipFormCreate/MozipLayout/MozipLayout";
import MozipManageTabs from "./MozipManageTabs/MozipManageTabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("서류 관리");

  const renderContent = () => {
    switch (activeTab) {
      case "서류 관리":
        return <MozipManageDocument onNext={() => setActiveTab("면접 관리")} />;
      case "면접 관리":
        return (
          <ManageInterview
            onPrev={() => setActiveTab("서류 관리")}
            onNext={() => setActiveTab("합불 관리")}
          />
        );
      case "합불 관리":
        return <ManagePassOrFail onPrev={() => setActiveTab("면접 관리")} />;
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
