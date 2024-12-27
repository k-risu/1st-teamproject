import { ResponsiveBullet } from "@nivo/bullet";
import { useEffect, useState } from "react";
import MoreOptionsModal from "./MoreOptionsModal"; // 모달 임포트
import {
  Card,
  CardImg,
  CardTod,
  MemberInfo,
  MemberInfoWrap,
  Members,
  MembersLayout,
  MembersLayoutTop,
  MembersSection,
  MembersSectionBT,
  MoreOptionsIcon,
  ProjectTitle,
  TaskList,
} from "./ProjectMembers.styles"; // 스타일 임포트
import UnassignedMsg from "./UnassignedMsg";

function ProjectMembers() {
  // 예시 데이터 (각각의 팀원에 대한 정보)
  const members = [
    {
      id: 1,
      name: "팀원1",
      role: "팀장",
      imageUrl: "path/to/image1.jpg",
      completedTasks: 8,
      totalTasks: 10,
    },
    {
      id: 2,
      name: "팀원2",
      role: "팀원",
      imageUrl: "",
      completedTasks: 4,
      totalTasks: 5,
    },
    {
      id: 3,
      name: "팀원3",
      role: "팀원",
      imageUrl: "path/to/image3.jpg",
      completedTasks: 2,
      totalTasks: 5,
    },
    {
      id: 4,
      name: "팀원4",
      role: "팀원",
      imageUrl: "path/to/image4.jpg",
      completedTasks: 6,
      totalTasks: 8,
    },
    {
      id: 5,
      name: "팀원5",
      role: "팀원",
      imageUrl: "path/to/image5.jpg",
      completedTasks: 3,
      totalTasks: 7,
    },
    {
      id: 6,
      name: "팀원6",
      role: "팀원",
      imageUrl: "path/to/image6.jpg",
      completedTasks: 0,
      totalTasks: 4,
    },
    {
      id: 7,
      name: "팀원7",
      role: "팀원",
      imageUrl: "path/to/image7.jpg",
      completedTasks: 9,
      totalTasks: 9,
    },
    {
      id: 8,
      name: "팀원8",
      role: "팀원",
      imageUrl: "path/to/image8.jpg",
      completedTasks: 5,
      totalTasks: 6,
    },
    {
      id: 9,
      name: "팀원9",
      role: "팀원",
      imageUrl: "path/to/image9.jpg",
      completedTasks: 5,
      totalTasks: 6,
    },
  ];
  const me = { id: 3, role: "팀장" };

  const [title, setTitle] = useState("");
  const [openModalId, setOpenModalId] = useState(null); // 모달이 열려 있는 카드 ID 관리
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // 모달 위치

  const [msgModal, setMsgModal] = useState(false); // UnassignedMsg 모달 상태

  const openModal = (id, event) => {
    const { top, left, width } = event.target.getBoundingClientRect(); // 아이콘 위치 계산
    setModalPosition({
      top: top + window.scrollY, // 스크롤 위치 고려
      left: left + width, // 아이콘 오른쪽 위치
    });
    setOpenModalId(id); // 모달 열기
  };

  // const handleDashboardClick = () => {
  //   // const unassignedMember = members.find((member) => !member.assignedTask);
  //   const unassignedMember = true;
  //   if (unassignedMember) {
  //     setMsgModal(true); // 할 일이 없는 팀원이 있으면 모달을 연다
  //   }
  // };
  const closeModal = () => setOpenModalId(null); // 모달 닫기
  const msgCloseModal = () => setMsgModal(false); // UnassignedMsg 모달 닫기

  const renderProgressBar = (completedTasks, totalTasks) => {
    const progressData = [
      {
        id: "progress",
        ranges: [0, totalTasks], // 전체 범위 설정
        measures: [completedTasks], // 완료된 작업 표시
        markers: [],
      },
    ];

    return (
      <div style={{ height: "50px", width: "250px", margin: "0 auto" }}>
        <ResponsiveBullet
          data={progressData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          spacing={46}
          layout="horizontal"
          titleAlign="start"
          titleOffsetX={-70}
          measureSize={0.3}
          rangeColors={["#e8e8e8"]}
          measureColors={["#67da6f"]}
        />
      </div>
    );
  };

  useEffect(() => {
    setTitle("단단무지");
  }, []);
  const renderMoreOptionsIcon = (memberId) => {
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

  /**
   *
   * @param {*} members
   * @param {*} chunkSize
   * @returns
   */
  const chunkMembers = (members, chunkSize) => {
    // 1. 멤버가 4명 이하일 경우, 8명까지 더미 데이터 추가
    if (members.length < 8) {
      const dummyMembers = new Array(8 - members.length).fill(null); // 더미 데이터를 null로 채운 배열
      members = [...members, ...dummyMembers]; // 실제 멤버 배열 뒤에 더미 데이터 추가
    }

    const result = [];
    for (let i = 0; i < members.length; i += chunkSize) {
      const chunk = members.slice(i, i + chunkSize);

      // 2. 남은 멤버가 chunkSize보다 적으면 더미값을 채우기
      while (chunk.length < chunkSize) {
        chunk.push(null); // 더미값 (null)
      }
      result.push(chunk);
    }
    return result;
  };


  return (
    <MembersLayout>
      <MembersLayoutTop>
        <ProjectTitle>
          <div>title</div>
          <span>{title}</span>의 구성원
        </ProjectTitle>
        <MembersSection>
          <MembersSectionBT
            type="button"
            sideProps={true}
            isOpenModal={openModalId}
            closeModal={msgCloseModal}
            onClick={() => setMsgModal(true)}
          >
            대시보드
          </MembersSectionBT>
          <MembersSectionBT type="button" sideProps={false}>
            구성원
          </MembersSectionBT>
        </MembersSection>
      </MembersLayoutTop>
      {msgModal && (
        <UnassignedMsg isOpen={msgModal} closeModal={msgCloseModal} />
      )}

      {/* 4개씩 그룹으로 나누어 렌더링 */}
      {memberChunks.map((chunk, chunkIndex) => (
        <Members key={chunkIndex}>
          {chunk.map((member) =>
            member ? (
              // 실제 팀원이 존재하면 일반 Card 출력
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
                  {renderMoreOptionsIcon(member.id)}
                </MemberInfo>
                <TaskList readonly />
                {renderProgressBar(member.completedTasks, member.totalTasks)}
                <MoreOptionsModal
                  isOpenModal={openModalId === member.id}
                  closeModal={closeModal}
                  modalPosition={modalPosition}
                  role={me.role}
                  memberRole={member.role}
                />
              </Card>
            ) : (
              // 멤버가 없으면 더미 Card 출력
              <Card key={chunkIndex} dummy={true} />
            ),
          )}
        </Members>
      ))}
    </MembersLayout>
  );
}

export default ProjectMembers;
