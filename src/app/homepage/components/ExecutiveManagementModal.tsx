import styled from "styled-components";
import { useState } from "react";
import { IoLinkOutline } from "react-icons/io5";

interface ExecutiveManagementModalProps {
  onClose: () => void;
}

const roles = ["관리", "평가", "조회", "운영진 삭제"];

export default function ExecutiveManagementModal({
  onClose,
}: ExecutiveManagementModalProps) {
  const [userRoles, setUserRoles] = useState<Record<string, string>>({
    김강민: "마스터",
    이나영: "관리",
    김현아: "평가",
    이예림: "조회",
    임승민: "평가",
    이수혁: "조회",
    정재웅: "평가",
  });

  const handleRoleChange = (name: string, newRole: string) => {
    if (newRole === "운영진 삭제") {
      const updatedRoles = { ...userRoles };
      delete updatedRoles[name];
      setUserRoles({ ...updatedRoles });
    } else {
      setUserRoles({ ...userRoles, [name]: newRole });
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>운영진 관리</h2>
          <CopyLink>
            <IoLinkOutline />
            링크 복사
          </CopyLink>
        </ModalHeader>
        <Divider />
        <ModalContent>
          <Input type="email" placeholder="이메일 입력" />
          <InviteButton>초대</InviteButton>
        </ModalContent>
        <MemberList>
          <h3>운영진 권한 관리 ({Object.keys(userRoles).length}명)</h3>
          <ul>
            {Object.entries(userRoles).map(([name, role]) => (
              <ListItem key={name}>
                <span>{name}</span>
                {role === "마스터" ? (
                  <RoleText>마스터</RoleText>
                ) : (
                  <Dropdown
                    value={role}
                    onChange={(e) => handleRoleChange(name, e.target.value)}
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
  background: white;
  width: 450px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CopyLink = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #5a5a5a;
  font-size: 14px;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
  margin: 10px 0;
`;

const ModalContent = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const InviteButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
`;

const MemberList = styled.div`
  h3 {
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
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
