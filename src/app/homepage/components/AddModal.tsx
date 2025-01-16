"use client"

import { useState } from 'react';
import styled from 'styled-components';
import { useModals } from '@/hooks/useModals';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';

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

export default function AddModal() {
  const { isModalOpen, openModal, closeModal } = useModals();
  const [clubName, setClubName] = useState("");
  const [isError, setIsError] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClubName(value);
    setIsError(value.length < 1 || value.length > 15);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  const removeFile = () => {
    setFileName("");
  };

  return (
  <>
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
      {fileName && (
        <FileInfo>
          <FileName>{fileName}</FileName>
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
      >
        동아리 생성
      </ModalButton>
      <ModalButton 
        $width='100%' 
        $height='56px' 
        $backgroundColor='#fff' 
        $borderRadius='12px' 
        $border='1px solid #000'
        onClick={closeModal}
      >
        닫기
      </ModalButton>
    </CustomModal>
  </>
  )
}
