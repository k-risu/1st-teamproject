import {
  Footer,
  Header,
  Label,
  UserDetail,
  Useremail,
  Userinfo,
  Usernickname,
  Userpage,
  UserProfile,
} from "./MyPage.styled";
import { useState, useEffect } from "react";
import axios from "axios"; // Axios 라이브러리 추가

function MyPage() {
  // 유저 데이터를 초기 상태로 설정
  const [userData, setUserData] = useState({
    nickname: "react그린이", // 기본 닉네임
    email: "reactgreen@example.com", // 기본 이메일
    profilePic: "https://via.placeholder.com/150", // 기본 프로필 이미지 URL
    userId: "defaultID123", // 기본 유저 ID 추가
    userStatusMessage: "", // 기본 상태 메시지
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false); // 이미지 팝업 상태

  // API 호출 함수
  const fetchUserData = async () => {
    try {
      const response = await axios.post("/api/user", {
        targetUserNo: 1, // 하드코딩된 예제. 필요 시 동적으로 변경 가능
      });

      if (response.data.code === "OK") {
        setUserData(response.data.userInfo); // 유저 정보 업데이트
      } else {
        console.error("Failed to fetch user data", response.data);
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

  const handleImageClick = () => {
    setIsPopupOpen(true); // 팝업 열기
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <div>
      {/* 헤더 영역 */}
      <Header>
        <h2>마이 페이지</h2>
      </Header>
      {/* 유저 정보 섹션 */}
      <Userinfo>
        <UserProfile>
          {/* 프로필 이미지와 기본 텍스트 */}
          <img
            src={userData.profilePic || "https://via.placeholder.com/150"} // 프로필 이미지
            alt="유저 프로필"
            style={{
              borderRadius: "50%", // 원형으로 보이게 설정
              width: "100px", // 너비
              height: "100px", // 높이
              cursor: "pointer", // 클릭 가능한 커서
            }}
            onClick={handleImageClick} // 클릭 이벤트 추가
          />
          <p>{userData.userStatusMessage || "유저 사진 및 정보"}</p>
        </UserProfile>

        {/* 유저 닉네임 및 이메일 정보 */}
        <Userpage>
          <UserDetail>
            <Label>이메일</Label>
            <Useremail>{userData.email}</Useremail>
          </UserDetail>
          <UserDetail>
            <Label>아이디</Label>
            <userId>{userData.userId}</userId>
          </UserDetail>
          <UserDetail>
            <Label>닉네임</Label>
            <Usernickname>{userData.nickname}</Usernickname>
          </UserDetail>
        </Userpage>
      </Userinfo>

      {/* 팝업 창 */}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleClosePopup} // 팝업 외부 클릭 시 닫기
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
          >
            <img
              src={userData.profilePic || "https://via.placeholder.com/150"}
              alt="유저 프로필 확대"
              style={{ width: "300px", height: "300px", borderRadius: "50%" }}
            />
            <button
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* 푸터 영역 */}
      <Footer>
        <button
          onClick={() => {
            window.location.href = "/mypage/myedit"; // 정보 변경 페이지로 이동
          }}
        >
          정보 변경하기
        </button>
      </Footer>
    </div>
  );
}

export default MyPage;
