import { ResponsiveBullet } from "@nivo/bullet";
import axios from "axios";
import { useEffect, useState } from "react";
import MoreOptionsModal from "./MoreOptionsModal";
import {
  Card,
  CardImg,
  CardTod,
  CheckedIcon,
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
} from "./ProjectMembers.styles";
import UnassignedMsg from "./UnassignedMsg";
import AddNewTaskModal from "./AddNewtask";
function ProjectMembers() {
  const projectNo = 1;
  const signedUserNo = 2;
  const [projectTitle, setProjectTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [leaderNo, setLeaderNo] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [msgModal, setMsgModal] = useState(false);
  const [isAddNewTaskModalOpen, setAddNewTaskModalOpen] = useState(false);
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/project/${projectNo}`, {
          params: { signedUserNo },
        });
        if (response.status === 200) {
          const { title, memberList, leaderNo } = response.data.project;
          setProjectTitle(title);
          setMembers(memberList);
          setLeaderNo(leaderNo);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        setProjectTitle("단단무지");
        setMembers([
          // Mock data
        ]);
        setLeaderNo(1);
      }
    };
    fetchProjectData();
  }, [projectNo, signedUserNo]);
  const renderProgressBar = (scheduleList) => {
    const totalTasks = scheduleList.length;
    const completedTasks = scheduleList.filter((task) => task.checked).length;
    const progressData = [
      {
        id: "progress",
        ranges: [0, totalTasks],
        measures: [completedTasks],
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
          rangeColors={["#E8E8E8"]}
          measureColors={["#67DA6F"]}
        />
      </div>
    );
  };
  const handleAddNewTask = (taskContent) => {
    console.log("새 할일 내용:", taskContent);
    setAddNewTaskModalOpen(false);
  };
  const openModal = (id, event) => {
    const { top, left, width } = event.target.getBoundingClientRect();
    setModalPosition({
      top: top + window.scrollY,
      left: left + width,
    });
    setOpenModalId(id);
  };
  const closeModal = () => setOpenModalId(null);
  const msgCloseModal = () => setMsgModal(false);
  const chunkMembers = (members, chunkSize) => {
    const result = [];
    while (members.length % chunkSize !== 0) {
      members.push(null);
    }
    for (let i = 0; i < members.length; i += chunkSize) {
      const chunk = members.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  };
  const memberChunks = chunkMembers(members, 4);
  return (
    <MembersLayout>
      <MembersLayoutTop>
        <ProjectTitle>
          <div>title</div>
          <span>{projectTitle}</span>의 구성원
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
      {memberChunks.map((chunk, chunkIndex) => (
        <Members key={chunkIndex}>
          {chunk.map((member) =>
            member ? (
              <Card key={member.userNo}>
                <CardTod />
                <MemberInfo>
                  {member.pic !== null ? (
                    <CardImg
                      src={`${import.meta.env.VITE_BASE_URL}/pic/user/${member.userNo}/${member.pic}`}
                      alt={member.nickname}
                    />
                  ) : (
                    <CardImg noImage />
                  )}
                  <MemberInfoWrap>
                    <h2>{member.nickname}</h2>
                    <span>{member.userNo === leaderNo ? "팀장" : "팀원"}</span>
                  </MemberInfoWrap>
                  {signedUserNo === member.userNo ||
                  signedUserNo === leaderNo ? (
                    <MoreOptionsIcon
                      onClick={(e) => openModal(member.userNo, e)}
                    />
                  ) : null}
                </MemberInfo>
                <TaskList>
                  {member.scheduleList.map((schedule) => (
                    <ul key={schedule.scheduleNo}>
                      <li>
                        <span>{schedule.content}</span>
                        <CheckedIcon checked={schedule.checked} />
                      </li>
                    </ul>
                  ))}
                </TaskList>
                {renderProgressBar(member.scheduleList)}
                <MoreOptionsModal
                  isOpenModal={openModalId === member.userNo}
                  closeModal={() => setOpenModalId(null)}
                  modalPosition={modalPosition}
                  role={signedUserNo === leaderNo ? signedUserNo : false}
                  signedUserNo={signedUserNo}
                  memberRole={member.userNo}
                  onAddNewTask={() => {
                    setAddNewTaskModalOpen(true);
                    closeModal();
                  }}
                />
              </Card>
            ) : (
              <Card key={chunkIndex} dummy={true} />
            ),
          )}
        </Members>
      ))}
      <AddNewTaskModal
        isOpen={isAddNewTaskModalOpen}
        closeModal={() => setAddNewTaskModalOpen(false)}
        onSubmit={handleAddNewTask}
      />
    </MembersLayout>
  );
}
export default ProjectMembers;
