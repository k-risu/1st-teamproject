import {
  BottomMembers,
  Card,
  CardImg,
  CardTod,
  MemberInfo,
  MemberInfoWrap,
  MembersLayout,
  MoreOptionsIcon,
  ProgressBar,
  TaskList,
  TopMembers,
} from "./ProjectMembers.styles"; // 스타일 임포트

function ProjectMembers() {
  // 예시 데이터 (각각의 팀원에 대한 정보)
  const members = [
    { id: 1, name: "팀원1", role: "팀장", imageUrl: "path/to/image1.jpg" },
    { id: 2, name: "팀원2", role: "팀원", imageUrl: "path/to/image2.jpg" },
    { id: 3, name: "팀원3", role: "팀원", imageUrl: "path/to/image3.jpg" },
    { id: 4, name: "팀원4", role: "팀원", imageUrl: "path/to/image4.jpg" },
    { id: 5, name: "팀원5", role: "팀원", imageUrl: "path/to/image5.jpg" },
    { id: 6, name: "팀원6", role: "팀원", imageUrl: "path/to/image6.jpg" },
    { id: 7, name: "팀원7", role: "팀원", imageUrl: "path/to/image7.jpg" },
    { id: 8, name: "팀원8", role: "팀원", imageUrl: "path/to/image8.jpg" },
  ];

  return (
    <MembersLayout>
      {/* 상단 4개의 카드 렌더링 */}
      <TopMembers>
        {members.slice(0, 4).map((member) => (
          <Card key={member.id}>
            <CardTod />
            <MemberInfo>
              <CardImg src={member.imageUrl} alt={member.name} />
              <MemberInfoWrap>
                <h2>{member.name}</h2>
                <span>{member.role}</span>
              </MemberInfoWrap>
              <MoreOptionsIcon />
            </MemberInfo>
            <TaskList readonly />
            <ProgressBar />
          </Card>
        ))}
      </TopMembers>

      {/* 하단 4개의 카드 렌더링 */}
      <BottomMembers>
        {members.slice(4, 8).map((member) => (
          <Card key={member.id}>
            <CardTod />
            <MemberInfo>
              <CardImg src={member.imageUrl} alt={member.name} />
              <MemberInfoWrap>
                <h2>{member.name}</h2>
                <span>{member.role}</span>
              </MemberInfoWrap>
              <MoreOptionsIcon />
            </MemberInfo>
            <TaskList />
            <ProgressBar />
          </Card>
        ))}
      </BottomMembers>
    </MembersLayout>
  );
}

export default ProjectMembers;
