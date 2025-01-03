import { useState } from "react";
import {
  BtWrap,
  MembersWrap,
  ModalContent,
  ModalOverlay,
  NoImg,
  CheckedIcon,
} from "./ChangeTaskUser.styles";
import axios from "axios";

const ChangeTaskUser = ({
  projectNo,
  signedUserNo,
  scheduleNo,
  members,
  closeModal,
  refreshData,
}) => {
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 팀원

  const handleUserSelect = (userNo) => {
    setSelectedUser(userNo); // 선택된 팀원의 번호를 상태로 설정
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      alert("변경할 팀원을 선택하세요.");
      return;
    }

    try {
      const response = await axios.put("/api/project/schedule", {
        scheduleNo,
        signedUserNo,
        scheduleUserNo: selectedUser,
        projectNo,
      });

      if (response.status === 200) {
        closeModal(); // 모달 닫기
        refreshData();
      }
    } catch (error) {
      console.error("할당 변경 실패:", error);
    }
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>변경할 팀원 선택</h2>
        <ul>
          <li>
            {members
              .filter((member) => member !== null && member.lock !== 1) // lock이 1인 멤버 제외
              .map((member, memberIndex) => (
                <MembersWrap
                  key={memberIndex}
                  onClick={() => handleUserSelect(member.userNo)} // 팀원 선택
                  style={{
                    backgroundColor:
                      selectedUser === member.userNo ? "#d3f9d8" : "#f4f4f4",
                  }}
                >
                  <span>{member.nickname}</span>
                  {member.pic ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/pic/user/${member.userNo}/${member.pic}`}
                    />
                  ) : (
                    <NoImg />
                  )}
                  <CheckedIcon
                    checked={selectedUser === member.userNo} // 선택된 상태 표시
                  />
                </MembersWrap>
              ))}
          </li>
        </ul>
        <BtWrap>
          <button onClick={handleSubmit}>변경</button> {/* 변경 버튼 */}
          <button onClick={closeModal}>취소</button> {/* 취소 버튼 */}
        </BtWrap>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChangeTaskUser;
