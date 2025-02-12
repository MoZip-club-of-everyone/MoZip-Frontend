"use client"
import { useState } from 'react';
import styled from 'styled-components';
import { useModalStore } from '@/stores/useModalStore';
// import { useModals } from '@/hooks/useModals';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';
import AddModal from './AddModal';
import headerLogo from '@/assets/logo/headerLogo.svg'; // 아무 사진도 첨부 안했을 시 기본이미지
import postClubCreate from '@/api/post/postClubCreate';

const AddButtonContainer = styled.div`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #D8D8D8;
  border-radius: 20px;
  cursor: pointer;
  background-color: #fff;
`;
const PlusIcon = styled.span`
  font-size: 48px;
  color: #363636;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
`
const ClubNameLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`
const Content = styled.div`
  font-size: 14px;
  font-weight: 500;
`
const CreateClubInput = styled.input<{ $isError: boolean }>`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${({ $isError }) => ($isError ? "#E84B4B" : "#ccc")};
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: ${({ $isError }) => ($isError ? "#E84B4B" : "#007bff")};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;
const ErrorMessage = styled.div`
  font-size: 13px;
  color: #E84B4B;
  margin-top: 4px;
`;

//파일 첨부
const FileButton = styled.label`
  display: inline-block;
  width: 63px;
  height: 28px;
  line-height: 24px;
  text-align: center;
  background-color: #fff;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  border: 1.5px solid #D8D8D8;

  &:hover {
    background-color: #bbb;
  }
`;
const FileInput = styled.input`
  display: none;
`;
const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;
const FileName = styled.span`
  font-size: 13px;
  &:hover{
    text-decoration: underline;
    text-underline-position:under;
  }
`;
const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

const ModalButton = styled(CustomButton)`
  font-weight: 600;
  font-size: medium;
`
const ImagePreview = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export default function AddClubButton() {
  // const { isModalOpen, openModal, closeModal } = useModals();
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const [clubName, setClubName] = useState("");
  const [isError, setIsError] = useState(false);
  // const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(''); // 에러 메시지 관리

  const allowedExtensions = ['jpeg', 'jpg', 'png', 'svg', 'webp']; // 허용 확장자

  // 동아리명 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClubName(value);
    setIsError(value.length < 1 || value.length > 15);
  };

  // 파일 첨부 처리(변경 후)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setFileError("지원하지 않는 확장자입니다. jpg, jpeg, png, svg, webp 파일을 업로드해주세요.");
      return;
    }

    setFile(selectedFile);
    setFileError("");
  };
  // 파일 삭제 처리
  const removeFile = () => {
    setFile(null);
    setFileError("");
  };

  //useState로 상태변수 아무거나 하나 만들고 모달 닫힌걸 이 변수로 감지시켜서 fetch함수 실행

  const handleClubCreate = async () => {
    if (!clubName.trim()) {
      alert("동아리명을 입력해주세요.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const image = file || headerLogo;

    try {
      const response = await postClubCreate(image, clubName);
      console.log("동아리 생성 성공:", response);
      alert("동아리가 성공적으로 생성되었습니다!");
      closeModal();
      removeFile();
    } catch (error: any) {
      console.error("동아리 생성 실패:", error.message || error);
      alert("동아리 생성에 실패했습니다.");
    }
  };

  return (
    <>
      <AddButtonContainer onClick={openModal}>
        <PlusIcon>+</PlusIcon>
      </AddButtonContainer>

      {/* <AddModal /> */}

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        $padding='3rem'
      >
        <Title>동아리 생성</Title>
        <ClubNameLayout>
          <Content>동아리명</Content>
          <CreateClubInput
            $isError={isError}
            value={clubName}
            onChange={handleInputChange}
          />
          {isError && (
            <ErrorMessage>1자 이상, 15자 이하로 입력해주세요.</ErrorMessage>
          )}
        </ClubNameLayout>

        <Content>동아리 사진 첨부</Content>
        <FileButton htmlFor="fileInput">파일 첨부</FileButton>
        <FileInput
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
        {/* {fileName && (
          <FileInfo>
            <FileName>{fileName}</FileName>
            <RemoveFileButton onClick={removeFile}>x</RemoveFileButton>
          </FileInfo>
        )} */}
        {file && (
          <FileInfo>
            <FileName>{file.name}</FileName>
            <RemoveFileButton onClick={removeFile}>x</RemoveFileButton>
          </FileInfo>
        )}

        <ModalButton
          $width="100%"
          $height="56px"
          $backgroundColor="#5296FF"
          $color='#fff'
          $borderRadius="12px"
          $border="none"
          onClick={handleClubCreate}
        >
          동아리 생성
        </ModalButton>
        <ModalButton
          $width='100%'
          $height='56px'
          $backgroundColor='#fff'
          $borderRadius='12px'
          $border='1px solid #000'
          onClick={() => {
            closeModal();
            removeFile();
          }}
        >
          닫기
        </ModalButton>
      </CustomModal>
    </>
  );
}