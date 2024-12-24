import React, { useEffect, useState } from "react";
import {
  BottomMembers,
  Card,
  CardImg,
  CardTod,
  MemberInfo,
  MemberInfoWrap,
  MembersLayout,
  MembersLayoutTop,
  MembersSection,
  MembersSectionBT,
  MoreOptionsIcon,
  ProgressBar,
  ProjectTitle,
  TaskList,
  TopMembers,
} from "./ProjectMembers.styles"; // 스타일 임포트
import MoreOptionsModal from "./MoreOptionsModal"; // 모달 임포트

function ProjectMembers() {
  // 예시 데이터 (각각의 팀원에 대한 정보)
  const members = [
    { id: 1, name: "팀원1", role: "팀장", imageUrl: "path/to/image1.jpg" },
    { id: 2, name: "팀원2", role: "팀원", imageUrl: "" },
    { id: 3, name: "팀원3", role: "팀원", imageUrl: "path/to/image3.jpg" },
    { id: 4, name: "팀원4", role: "팀원", imageUrl: "path/to/image4.jpg" },
    { id: 5, name: "팀원5", role: "팀원", imageUrl: "path/to/image5.jpg" },
    { id: 6, name: "팀원6", role: "팀원", imageUrl: "path/to/image6.jpg" },
    { id: 7, name: "팀원7", role: "팀원", imageUrl: "path/to/image7.jpg" },
    { id: 8, name: "팀원8", role: "팀원", imageUrl: "path/to/image8.jpg" },
  ];
  const me = { id: 3, role: "팀장" };

  const [title, setTitle] = useState("");
  const [openModalId, setOpenModalId] = useState(null); // 모달이 열려 있는 카드 ID 관리
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // 모달 위치

  const openModal = (id, event, role) => {
    const { top, left, width } = event.target.getBoundingClientRect(); // 아이콘 위치 계산
    setModalPosition({
      top: top + window.scrollY, // 스크롤 위치 고려
      left: left + width, // 아이콘 오른쪽 위치
    });
    setOpenModalId(id); // 모달 열기
  };

  const closeModal = () => setOpenModalId(null); // 모달 닫기

  useEffect(() => {
    setTitle("단단무지");
  }, []);
  const renderMoreOptionsIcon = (memberId, memberRole) => {
    if (me.role === "팀장") {
      return (
        <MoreOptionsIcon
          onClick={(e) => openModal(memberId, e)} // 클릭 시 위치 계산
        />
      );
    }
    if (me.id === memberId) {
      return (
        <MoreOptionsIcon
          onClick={(e) => openModal(memberId, e)} // 클릭 시 위치 계산
        />
      );
    }
    return null; // 조건이 맞지 않으면 아무것도 렌더링하지 않음
  };

  return (
    <MembersLayout>
      <MembersLayoutTop>
        <ProjectTitle>
          <div>title</div>
          <span>{title}</span>의 구성원
        </ProjectTitle>
        <MembersSection>
          <MembersSectionBT type="button" sideProps={true}>
            대시보드
          </MembersSectionBT>
          <MembersSectionBT type="button" sideProps={false}>
            구성원
          </MembersSectionBT>
        </MembersSection>
      </MembersLayoutTop>

      {/* 상단 4개의 카드 렌더링 */}
      <TopMembers top={true}>
        {members.slice(0, 4).map((member) => (
          <Card key={member.id}>
            <CardTod />
            <MemberInfo>
              {member.imageUrl ? (
                <CardImg src={member.imageUrl} />
              ) : (
                <CardImg noImage />
              )}
              <MemberInfoWrap>
                <h2>{member.name}</h2>
                <span>{member.role}</span>
              </MemberInfoWrap>
              {/* 팀원 자신만 활성화 */}
              {renderMoreOptionsIcon(member.id, member.role)}
            </MemberInfo>
            <TaskList readonly />
            <ProgressBar />
            <MoreOptionsModal
              isOpenModal={openModalId === member.id} // 해당 카드에 대해서만 모달이 열리도록
              closeModal={closeModal}
              modalPosition={modalPosition} // 모달 위치 전달
            />
          </Card>
        ))}
      </TopMembers>

      {/* 하단 4개의 카드 렌더링 */}
      <BottomMembers>
        {members.slice(4, 8).map((member) => (
          <Card key={member.id}>
            <CardTod />
            <MemberInfo>
              {member.imageUrl ? (
                <CardImg src={member.imageUrl} />
              ) : (
                <CardImg noImage />
              )}
              <MemberInfoWrap>
                <h2>{member.name}</h2>
                <span>{member.role}</span>
              </MemberInfoWrap>
              {me.id === member.id ? (
                <MoreOptionsIcon
                  onClick={(e) => openModal(member.id, e)} // 클릭 시 위치 계산
                />
              ) : (
                ""
              )}
            </MemberInfo>
            <TaskList />
            <ProgressBar />
            <MoreOptionsModal
              isOpenModal={openModalId === member.id} // 해당 카드에 대해서만 모달이 열리도록
              closeModal={closeModal}
              modalPosition={modalPosition} // 모달 위치 전달
            />
          </Card>
        ))}
      </BottomMembers>
    </MembersLayout>
  );
}

export default ProjectMembers;
