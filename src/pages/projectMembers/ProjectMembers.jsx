import {
  Card,
  CardImg,
  CardTod,
  MemberInfo,
  MemberInfoWrap,
  MoreOptionsIcon,
  ProgressBar,
  TaskList,
} from "./ProjectMembers.styles";

function ProjectMembers() {
  return (
    <Card>
      <CardTod></CardTod>
      <MemberInfo>
        <CardImg></CardImg>
        <MemberInfoWrap>
          <h2>팀장이름</h2>
          <span>팀장</span>
        </MemberInfoWrap>
        <MoreOptionsIcon />
      </MemberInfo>
      {/* <StatusMessage>8:00 ~ 18:00 이외에는 연락이 되지 않습니다.</StatusMessage> */}
      {/* <span>할일 목록</span> */}
      <TaskList></TaskList>
      <ProgressBar></ProgressBar>
    </Card>
  );
}
export default ProjectMembers;
