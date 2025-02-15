//운영진 역할 변경, 삭제 api 연동 성공 시 주석처리된 부분 지울것 
import styled from "styled-components";
import { useState, useEffect } from "react";
import { IoLinkOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import CustomRow from "@/components/CustomRow";
import postMemberInvite from "@/api/post/postMemberInvite";
import getManageList from "@/api/get/getManageList";
import putUserPosition from "@/api/put/putUserPosition";
import deleteUser from "@/api/delete/deleteUser";

interface ExecutiveManagementModalProps {
  onClose: () => void;
}

const roles = ["관리", "평가", "조회", "운영진 삭제"];

export default function ExecutiveManagementModal({
  onClose,
}: ExecutiveManagementModalProps) {
  const [manageList, setManageList] = useState<Array<{
    realname: string; 
    position_name: string;
    user_id: string;
  }>>([]);

  // 운영진 목록 조회
  useEffect(() => {
    const fetchManageList = async () => {
      const clubId = localStorage.getItem("selectedClubId");
      if (!clubId) {
        alert('동아리가 존재하지 않습니다.');
        return;
      }

      try {
        const response = await getManageList(clubId);
        setManageList(response);
        console.log("운영진 목록: ", response);
      } catch (error) {
        console.error("운영진 목록 가져오기 실패:", error);
        alert('운영진 목록을 불러오는데 실패했습니다.');
      }
    };

    fetchManageList();
  }, []); // 모달이 처음 렌더링될 때 한 번만 실행

  // 운영진 역할 변경, 삭제
  const handleRoleChange = async (realname: string, newRole: string ) => {
    const clubId = localStorage.getItem("selectedClubId");
    if (!clubId) {
      alert('동아리가 존재하지 않습니다.');
      return;
    }

    if (newRole === "운영진 삭제") {
      try {
        const data = {
          realname: realname
        };
        
        await deleteUser(clubId, data);
        
        // API 호출이 성공하면 상태 업데이트
        setManageList(prev => prev.filter(member => member.realname !== realname));
        console.log('운영진 삭제 성공');
      } catch (error) {
        alert('운영진 삭제에 실패했습니다.');
        console.error("운영진 삭제 실패:", error);
      }
    } else {
      // 운영진 역할 변경
      try {
        const data = {
          realname: realname, //확인해야할 부분
          positionName: newRole
        };
        
        await putUserPosition(clubId, data);
        
        // API 호출이 성공하면 상태 업데이트
        setManageList(prev => 
          prev.map(member => 
            member.realname === realname 
              ? { ...member, position_name: newRole }
              : member
          )
        );
      } catch (error) {
        alert('역할 변경에 실패했습니다.');
        console.error("역할 변경 실패:", error);
      }
    }
  };

  const [email, setEmail] = useState('');
  const clubId = localStorage.getItem("selectedClubId");

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 운영진 초대 api연동
  const handleInvite = async () => {
    if (!clubId) {
      alert('동아리가 존재하지 않습니다.'); //clubId가 존재하지 않을 때
      return;
    }

    const inviteData = {
      email: email,
    };
    console.log('운영진 초대 성공: ', inviteData); // 리퀘스트 데이터
    try {
      const response = await postMemberInvite(clubId, inviteData);
      console.log('초대 성공')
      alert('초대에 성공하였습니다.')
    } catch (error: any) {
      alert('초대에 실패했습니다.')
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoClose size={24} />
        </CloseButton>
        <CustomRow
          $width="auto"
          $alignitems="flex-end"
          $justifycontent="space-between"
          $gap="0.5rem"
        >
          <Title>운영진 관리</Title>
          <CopyLink>
            <IoLinkOutline /> 링크 복사
          </CopyLink>
        </CustomRow>

        <hr />
        <ModalContent>
          <InputWrapper>
            <CreateClubInput 
              type="email" 
              placeholder="이메일 입력" 
              value={email}
              onChange={handleEmailChange}
            />
            <InviteButton onClick={handleInvite}>초대</InviteButton>
          </InputWrapper>
        </ModalContent>
        <MemberList>
        <Content>
          운영진 권한 관리 ({manageList.length}명)
        </Content>
        <ul>
          {manageList.map(({ realname, position_name, user_id }) => (
            <ListItem key={realname}>
              <span>{realname}</span>
              {position_name === "마스터" ? (
                <RoleText>마스터</RoleText>
              ) : (
                <Dropdown
                  value={position_name}
                  onChange={(e) => handleRoleChange(realname, e.target.value)}
                >
                  {roles.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Dropdown>
              )}
            </ListItem>
          ))}
          </ul>
        </MemberList>
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
  position: relative;
  background: white;
  width: 450px;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #333;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 1rem;
`;

const CopyLink = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #5a5a5a;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  margin: 1rem 0;
`;

const Content = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CreateClubInput = styled.input`
  flex: 1;
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

const InviteButton = styled.button`
  background: #5296ff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
`;

const MemberList = styled.div`
  margin-top: 20px;

  ul {
    list-style: none;
    padding: 0;
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;

  span {
    font-size: 14px;
  }
`;

const RoleText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const Dropdown = styled.select`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
`;
