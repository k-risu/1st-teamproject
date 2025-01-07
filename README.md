# 🛠️ 1차 Teamate 프로젝트

### 📅 프로젝트 기간

**2024.12.16 ~ 2025.1.8**

---

![Teamate 로고](./public/logo400x400.png)

## 📖 프로젝트 소개

**1차 Teamate**는 프로젝트 협업 관리 도구로, 팀원 간의 협업적인 역할 분담과 진행 상황을 관리할 수 있습니다.  
초기 보호적인 기능을 제공하며, 협업을 원활하게 진행할 수 있는 환경을 제공합니다.

![Teamate 메인 화면](./public/temate-main.PNG)

---

## 🛠️ 사용 기술 스택

### 💻 **사용 언어 및 라이브러리**

![사용 언어 및 라이브러리 이미지](./public/li-image.png)

### 📂 **형상관리 도구**

<img src="./public/GitHub_Logo.jpg" alt="로고 이미지" style="width: 150px; height: auto; display: block;" />

### 💬 **BackEnd 협업 도구**

<img src="./public/Slack-Logo.jpg" alt="로고 이미지" style="width: 150px; height: auto; display: block; backgr" />

---

## ⭐ 주요 기능

### 👨‍💼 **팀장 : 이한샘**

- **📅 캘린더**
  - 프로젝트 기간을 캘린더에 표시
  - 특정 날짜 클릭 시 프로젝트 구성원 확인 가능
- **📊 프로젝트 대시보드**
  - 프로젝트 목록 및 진행률 표시
  - 개인 진행률과 프로젝트 구성원 정보 확인 가능

### 👩‍💻 **팀원 : 김기동**

- **🔑 회원가입**
  - 메일 인증 및 아이디 중복 확인
  - 입력 필드의 유효성 검증 기능 제공
- **👥 프로젝트 구성원 상세보기**
  - 할 일 등록, 수정, 삭제 및 상세 보기 지원
  - 개인 할 일의 진행률 표시 및 완료 여부 관리
  - 프로젝트 팀원 제외 기능 및 상태 알림 메시지 제공

### 👨‍💻 **팀원 : 이유석**

- **🔒 로그인**
  - 아이디 및 비밀번호 찾기 기능 제공
  - 입력 필드의 유효성 검증 포함
- **📝 유저 상세 페이지**
  - 유저 정보 출력
  - 유저 정보 변경 및 이미지 변경

---

## 📅 프로젝트 일정

- **2024.12.16**: 프로젝트 시작, 초기 설계 및 개발 계획 수립
- **2024.12.20**: 기능 설계 완료, 기본 UI 디자인 시작
- **2024.12.30**: 회원가입, 로그인 및 캘린더 기능 구현
- **2025.1.3**: 프로젝트 대시보드 및 할 일 관리 기능 구현 완료
- **2025.1.7**: 최종 버그 수정 및 기능 테스트
- **2025.1.8**: 프로젝트 종료, 최종 리뷰 및 발표

---

## 🎯 향후 개선사항

- **디자인 향상**: UI/UX 디자인 개선을 통해 사용자 경험을 높일 예정입니다.
- **기능 추가**: 팀원 간 실시간 채팅, 알림 시스템 등의 기능 추가를 계획하고 있습니다.

---

### 최종 목표

1차 Teamate 프로젝트는 팀원 간의 원활한 협업과 프로젝트 진행 상황을 효율적으로 관리할 수 있는 도구를 제공합니다. 향후 더 많은 기능과 디자인 개선을 통해 협업에 있어 중요한 역할을 할 수 있도록 발전할 것입니다.

### git tree

```
📦src
┣ 📂components
┃ ┣ 📂basic
┃ ┃ ┣ 📂header
┃ ┃ ┃ ┣ 📜BreadCrumb.jsx
┃ ┃ ┃ ┣ 📜Header.jsx
┃ ┃ ┃ ┣ 📜Header.styles.jsx
┃ ┃ ┃ ┣ 📜index.jsx
┃ ┃ ┃ ┗ 📜index.styled.jsx
┃ ┃ ┗ 📂sidebar
┃ ┃ ┃ ┣ 📜SideBar.jsx
┃ ┃ ┃ ┗ 📜SideBar.styles.jsx
┃ ┣ 📂modal
┃ ┃ ┣ 📜Modal.jsx
┃ ┃ ┗ 📜Modal.styles.jsx
┃ ┣ 📜Layout.jsx
┃ ┣ 📜Layout.styles.jsx
┃ ┗ 📜ToggleButton.jsx
┣ 📂hooks
┃ ┗ 📜useModal.jsx
┣ 📂pages
┃ ┣ 📂calendar
┃ ┃ ┣ 📜Schedule.jsx
┃ ┃ ┗ 📜Schedule.styles.jsx
┃ ┣ 📂dashboard
┃ ┃ ┣ 📜DashBoard.jsx
┃ ┃ ┣ 📜DashBoard.styles.jsx
┃ ┃ ┗ 📜ProjectProgress.jsx
┃ ┣ 📂mypage
┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📜NicknameValidation.jsx
┃ ┃ ┃ ┣ 📜ProfileImage.jsx
┃ ┃ ┃ ┗ 📜UserForm.jsx
┃ ┃ ┣ 📂hooks
┃ ┃ ┃ ┗ 📜useFetchUserInfo.js
┃ ┃ ┣ 📜MyPage.jsx
┃ ┃ ┣ 📜MyPage.styled.jsx
┃ ┃ ┣ 📜MyPageEdit.jsx
┃ ┃ ┗ 📜MyPageEdit.styled.jsx
┃ ┣ 📂projectCreation
┃ ┃ ┣ 📜AddModal.jsx
┃ ┃ ┣ 📜AddModal.styles.jsx
┃ ┃ ┣ 📜DateModal.jsx
┃ ┃ ┣ 📜DateModal.styles.jsx
┃ ┃ ┣ 📜ProjectCreationPage.jsx
┃ ┃ ┗ 📜ProjectCreationPage.styles.jsx
┃ ┣ 📂projectedit
┃ ┃ ┣ 📜EditDateModal.jsx
┃ ┃ ┣ 📜EditMemberModal.jsx
┃ ┃ ┣ 📜EditMemberModal.styles.jsx
┃ ┃ ┗ 📜ProjectEditPage.jsx
┃ ┣ 📂projectlist
┃ ┃ ┣ 📜ProjectList.jsx
┃ ┃ ┗ 📜ProjectList.styles.jsx
┃ ┣ 📂projectMembers
┃ ┃ ┣ 📂Modal
┃ ┃ ┃ ┣ 📜DeleteModal.jsx
┃ ┃ ┃ ┣ 📜DeleteModal.styles.jsx
┃ ┃ ┃ ┣ 📜MoreOptionsModal.jsx
┃ ┃ ┃ ┣ 📜MoreOptionsModal.styles.jsx
┃ ┃ ┃ ┣ 📜OpenTaskModal.jsx
┃ ┃ ┃ ┣ 📜OpenTaskModal.styles.jsx
┃ ┃ ┃ ┣ 📜UnassignedMsg.jsx
┃ ┃ ┃ ┗ 📜UnassignedMsg.styles.jsx
┃ ┃ ┣ 📜ProjectMembers.jsx
┃ ┃ ┣ 📜ProjectMembers.styles.jsx
┃ ┃ ┣ 📜projectMemberUtils.js
┃ ┃ ┗ 📜renderProgressBar.jsx
┃ ┣ 📂signin
┃ ┃ ┣ 📜SignIn.jsx
┃ ┃ ┣ 📜signin.styled.jsx
┃ ┃ ┣ 📜SigninForm.jsx
┃ ┃ ┣ 📜SigninID.jsx
┃ ┃ ┣ 📜SigninPw.jsx
┃ ┃ ┣ 📜SigninRepw.jsx
┃ ┃ ┗ 📜SignInRepw.styled.jsx
┃ ┣ 📂signup
┃ ┃ ┣ 📜MailModal.jsx
┃ ┃ ┣ 📜MailModal.styles.jsx
┃ ┃ ┣ 📜MailTimer.jsx
┃ ┃ ┣ 📜SignUp.jsx
┃ ┃ ┗ 📜SignUp.styles.jsx
┃ ┣ 📂startingPage
┃ ┃ ┣ 📜StartingPage.jsx
┃ ┃ ┗ 📜StartingPage.styles.jsx
┃ ┣ 📜NotFound.jsx
┃ ┗ 📜NotFound.styles.jsx
┣ 📂utils
┃ ┣ 📜cookie.js
┃ ┣ 📜font.css
┃ ┣ 📜isLogin.jsx
┃ ┣ 📜Portal.jsx
┃ ┣ 📜RegExp.jsx
┃ ┗ 📜schedule-utils.jsx
┣ 📜App.css
┣ 📜App.jsx
┣ 📜index.css
┗ 📜main.jsx
```
