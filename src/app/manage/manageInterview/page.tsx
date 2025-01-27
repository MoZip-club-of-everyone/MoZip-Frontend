"use client";

// 면접관리 화면
// 담당자(담당 브랜치): yerim

interface ManageInterviewProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function ManageInterview({
  onNext,
  onPrev,
}: ManageInterviewProps) {
  return <div>면접 관리</div>;
}
