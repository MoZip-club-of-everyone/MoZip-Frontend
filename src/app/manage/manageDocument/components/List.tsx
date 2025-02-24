import { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import { ReadPaperApplicantsForMozipData } from "@/api/applicants.type";
import { getReadPaperApplicantsForMozip } from "@/api/applicants";
import { updatePaperStatus } from "@/api/evaluation";
import { ApplicantsResponse } from "@/api/applicants.type";
import axiosInstance from "@/api/axiosInstance";

export default function List() {
  // const [applicantsData, setApplicantsData] = useState<ReadPaperApplicantsForMozipData | null>(null);
  const [applicantsData, setApplicantsData] = useState<ApplicantsResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const mozipId = localStorage.getItem("mozipId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!mozipId) {
        return;
      }
      setIsLoading(true);
      const response = await axiosInstance.get<ApplicantsResponse>(
        `/api/mozip/${mozipId}/applicants/papers`
      );

      console.log("API 응답 데이터:", response);
      console.log("API 응답:", response.data.applicants);

      if (response.data && response.data.applicants.length > 0) {
        console.log("첫 번째 지원자의 이름:", response.data.applicants[0].realname);

        setApplicantsData(response.data);
      } else {
        console.log("null임 !!!");
        setApplicantsData(null);
      }
    } catch (error) {
      console.error("서류 지원자 목록 데이터 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };



  const filteredApplicants = applicantsData
    ? selectedFilter
      ? applicantsData.applicants.filter((a) => a.paper_status === selectedFilter)
      : applicantsData.applicants
    : [];


  const handleStatusUpdate = async (
    status: "합격" | "불합격" | "보류" | "예비"
  ) => {
    if (selectedApplicants.length === 0) {
      alert("선택된 지원자가 없습니다.");
      return;
    }

    try {
      const updateData = {
        applicants: selectedApplicants.map((id) => ({
          applicant_id: id,
          status: status,
        })),
      };

      await updatePaperStatus(updateData);

      // 로컬 상태 업데이트
      if (applicantsData) {
        const updatedApplicants = applicantsData.applicants.map((applicant) => {
          if (selectedApplicants.includes(applicant.applicant_id)) {
            return {
              ...applicant,
              paper_status: status,
            };
          }
          return applicant;
        });

        const newPassedCount = updatedApplicants.filter(
          (a) => a.paper_status === "합격"
        ).length;
        const newFailedCount = updatedApplicants.filter(
          (a) => a.paper_status === "불합격"
        ).length;
        const newPPendingCount = updatedApplicants.filter(
          (a) => a.paper_status === "보류"
        ).length;
        const newReserveCount = updatedApplicants.filter(
          (a) => a.paper_status === "예비"
        ).length;

        setApplicantsData({
          ...applicantsData,
          applicants: updatedApplicants,
          passed_cnt: newPassedCount,
          failed_cnt: newFailedCount,
        });

        setSelectedApplicants([]);
        alert(`선택된 지원자들의 상태가 ${status}으로 변경되었습니다.`);
      }
    } catch (error) {
      console.error(`서류 ${status} 처리 실패:`, error);
      alert(`상태 변경 중 오류가 발생했습니다.`);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && applicantsData) {
      setSelectedApplicants(
        applicantsData.applicants.map((a) => a.applicant_id)
      );
    } else {
      setSelectedApplicants([]);
    }
  };

  const handleSelectApplicant = (applicantId: string) => {
    setSelectedApplicants((prev) => {
      if (prev.includes(applicantId)) {
        return prev.filter((id) => id !== applicantId);
      }
      return [...prev, applicantId];
    });
  };

  const copyEmails = () => {
    if (!applicantsData) return;

    const selectedEmails = applicantsData.applicants
      .filter((applicant) =>
        selectedApplicants.includes(applicant.applicant_id)
      )
      .map((applicant) => applicant.email)
      .join(", ");

    navigator.clipboard.writeText(selectedEmails);
    alert("이메일 주소가 복사되었습니다.");
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!applicantsData) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <CustomColumn
      $width="100%"
      $alignitems="flex-start"
      $justifycontent="flex-start"
      $gap="0px"
    >
      {/* Header Section */}
      <CustomRow
        $width="100%"
        $alignitems="flex-end"
        $justifycontent="flex-start"
      >
        <CustomFont $font="24px" $color="#363636" $fontweight="bold">
          서류 지원자 목록
        </CustomFont>
        <Applicant
          blue={selectedFilter === null}
          onClick={() => setSelectedFilter(null)}
        >
          전체 {applicantsData.total_cnt}명
        </Applicant>{" "}
        |
        <Applicant
          blue={selectedFilter === "합격"}
          onClick={() => setSelectedFilter("합격")}
        >
          합격자 {applicantsData.passed_cnt}명
        </Applicant>{" "}
        |{" "}
        <Applicant
          blue={selectedFilter === "불합격"}
          onClick={() => setSelectedFilter("불합격")}
        >
          불합격자 {applicantsData.failed_cnt}명
        </Applicant>
      </CustomRow>

      {/* Buttons Section */}
      <CustomRow $width="100%" $justifycontent="space-between" $margin="0.5rem">
        <BtnsLeft>
          <CheckButton onClick={() => handleStatusUpdate("합격")}>
            서류합격
          </CheckButton>
          <CheckButton onClick={() => handleStatusUpdate("불합격")}>
            서류불합격
          </CheckButton>
          <CheckButton onClick={() => handleStatusUpdate("보류")}>
            보류
          </CheckButton>
          <CheckButton onClick={() => handleStatusUpdate("예비")}>
            예비
          </CheckButton>
        </BtnsLeft>
        <BtnsRight>
          <CheckButton onClick={copyEmails}>
            <MdOutlineContentCopy />
            이메일 주소 복사
          </CheckButton>
          <CheckButton>
            <BsDownload />
            PDF 다운로드
          </CheckButton>
        </BtnsRight>
      </CustomRow>

      {/* Table Section */}
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedApplicants.length ===
                    applicantsData.applicants.length
                  }
                />
              </th>
              <th>지원번호</th>
              <th>성명</th>
              <th>지원일시</th>
              <th>지원서</th>
              <th>서류 평가점수</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>합격여부</th>
            </tr>
          </thead>
          <tbody>
            {/* {applicantsData.applicants.map((applicant) => ( */}
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.applicant_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedApplicants.includes(
                      applicant.applicant_id
                    )}
                    onChange={() =>
                      handleSelectApplicant(applicant.applicant_id)
                    }
                  />
                </td>
                <td>{applicant.application_number}</td>
                <td>{applicant.realname}</td>
                <td>{new Date(applicant.applied_at).toLocaleString()}</td>
                <td>
                  <a
                    href="#"
                    style={{ color: "#5296FF", textDecoration: "none" }}
                  >
                    지원서
                  </a>
                </td>
                <td>{applicant.paper_score_average !== null ? applicant.paper_score_average.toFixed(2) : "점수없음"}</td>

                <td>{applicant.email}</td>
                <td>{applicant.phone}</td>
                <td>{applicant.paper_status}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </CustomColumn>
  );
}

const Applicant = styled.p<{ blue?: boolean }>`
  font-size: 16px;
  color: ${({ blue }) => (blue ? "#5296FF" : "inherit")};
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  thead th {
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    background-color: white;
    font-weight: bold;
    padding: 8px;
    text-align: center;
  }

  tbody td {
    padding: 8px;
    text-align: center;
    background-color: white;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

const BtnsLeft = styled.div`
  display: flex;
  gap: 1rem;
`;

const BtnsRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const CheckButton = styled.div`
  display: flex;
  border: 1px solid #464646;
  padding: 3px 5px;
  border-radius: 4px;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;
