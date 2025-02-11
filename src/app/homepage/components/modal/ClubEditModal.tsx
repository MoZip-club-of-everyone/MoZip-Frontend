import { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

interface ClubEditModalProps {
  onClose: () => void;
}

export default function ClubEditModal({ onClose }: ClubEditModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>동아리 수정</Title>

        <ClubNameLayout>
          <Content>동아리명</Content>
          <CreateClubInput defaultValue="멋쟁이사자처럼" />
        </ClubNameLayout>

        <Content>동아리 사진 첨부</Content>
        <FileButton htmlFor="fileInput">파일 첨부</FileButton>
        <FileInput
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {file && (
          <FilePreview>
            <img src={preview!} alt="동아리 사진 미리보기" />
            <CloseButton onClick={removeFile}>
              <IoClose />
            </CloseButton>
          </FilePreview>
        )}

        <ModalButton
          $width="100%"
          $height="56px"
          $backgroundColor="#5296FF"
          $color="#fff"
          $borderRadius="12px"
          $border="none"
        >
          완료
        </ModalButton>
        <ModalButton
          $width="100%"
          $height="56px"
          $backgroundColor="#fff"
          $borderRadius="12px"
          $border="1px solid #000"
          onClick={onClose}
        >
          닫기
        </ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 450px;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 2rem;
`;

const ClubNameLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CreateClubInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

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
  border: 1.5px solid #d8d8d8;

  &:hover {
    background-color: #bbb;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FilePreview = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalButton = styled.button<{
  $width: string;
  $height: string;
  $backgroundColor: string;
  $color?: string;
  $borderRadius: string;
  $border: string;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color || "#000"};
  border-radius: ${(props) => props.$borderRadius};
  border: ${(props) => props.$border};
  font-weight: 600;
  font-size: medium;
  margin-top: 1rem;
  cursor: pointer;
`;
