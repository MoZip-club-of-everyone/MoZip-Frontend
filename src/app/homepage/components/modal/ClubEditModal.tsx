import { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import putClubInformation from "@/api/put/putClubInformation";

interface ClubEditModalProps {
  onClose: () => void;
}

const ErrorMessage = styled.div`
  font-size: 13px;
  color: #E84B4B;
  margin-top: 4px;
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


export default function ClubEditModal({ onClose }: ClubEditModalProps) {
  const clubName = localStorage.getItem("selectedClubName");
  const clubImage = localStorage.getItem("selectedClubImage")
  const [clubNameValue, setClubNameValue] = useState(clubName || '');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(clubImage);

  const [fileError, setFileError] = useState(''); // 에러 메시지 관리

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

  const handleClubEdit = async () => {
    const clubId = localStorage.getItem("selectedClubId");
      if (!clubId) {
        alert('동아리가 존재하지 않습니다.');
        return;
      }
    
    // 이미지 처리 로직
    let imageToSend: File | string;
    if (file) {
      imageToSend = file;  // 새로 선택된 파일이 있는 경우
    } else if (preview) {
      imageToSend = preview;  // 기존 이미지 URL이 있는 경우
    } else {
      alert('이미지를 선택해주세요.');
      return;
    }

    const Request = {
      name: clubNameValue,
      image: imageToSend,
    }
    console.log("동아리 정보 수정 내용: ", Request) 

      try {
        const response = await putClubInformation(clubId, Request);
        console.log("동아리 정보 수정 성공: ", response);
         // 서버 응답의 이미지 URL을 로컬 스토리지에 저장(홈페이지 나가기 전에 모달 다시 여는 경우에 수정한 정보를 띄우기 위해)
        if (response.image) {
          localStorage.setItem("selectedClubImage", response.image);
        }
        
        // 동아리 이름도 업데이트
        localStorage.setItem("selectedClubName", response.name);
        
        alert("동아리가 성공적으로 수정되었습니다!");

        setTimeout(() => {
          onClose();
        }, 100);
        
      } catch (error: any) {
          console.error("동아리 정보 수정 실패: ", error);
          alert('동아리 정보 수정에 실패했습니다.');
      }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>동아리 수정</Title>

        <ClubNameLayout>
          <Content>동아리명</Content>
          <CreateClubInput 
            value={clubNameValue}
            onChange={(e) => setClubNameValue(e.target.value)}
          />
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
        {file && (
          <FileInfo>
            <FileName>{file.name}</FileName>
            <RemoveFileButton onClick={removeFile}>x</RemoveFileButton>
          </FileInfo>
        )}
        
        {(file || preview) && (
          <FilePreview>
            <img src={preview || URL.createObjectURL(file!)} alt="동아리 사진 미리보기" />
            <CloseButton onClick={removeFile}>
              <IoClose />
            </CloseButton>
          </FilePreview>
        )}  
        
        {/* {file && (
          <FilePreview>
            <img src={preview!} alt="동아리 사진 미리보기" />
            <CloseButton onClick={removeFile}>
              <IoClose />
            </CloseButton>
          </FilePreview>
        )} */}

        <ModalButton
          $width="100%"
          $height="56px"
          $backgroundColor="#5296FF"
          $color="#fff"
          $borderRadius="12px"
          $border="none"
          onClick={handleClubEdit}
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
    width: 60%;
    aspect-ratio: 1/1;  // 1:1 비율
    /* max-height: 200px; */
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 80px;
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
