import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  UserId,
} from "./MyPage.styled";

function MyPage() {
  const [cookies] = useCookies(["signedUserNo"]); // 쿠키에서 signedUserNo 가져오기
  const { targetUserNo } = useParams(); // URL에서 targetUserNo 가져오기
  const [userData, setUserData] = useState({
    nickname: "테스트 유저", // 임의 닉네임
    email: "testuser@example.com", // 임의 이메일
    pic: "https://via.placeholder.com/150", // 기본 프로필 이미지 URL
    userId: "testID123", // 임의 유저 ID
    userStatusMessage: "상태 메시지 테스트", // 임의 상태 메시지
    myInfo: true, // 정보 변경 버튼이 표시되도록 설정
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 쿠키와 localStorage에서 데이터 가져오기
  // const signedUserNo = cookies.signedUserNo || localStorage.getItem("userId");
  const signedUserNo = 2;

  // 공통 API 호출 함수
  const fetchUserData = async () => {
    const endpoint = "/api/user";

    if (!signedUserNo) {
      console.error("필수 값(signedUserNo)이 누락되었습니다.");
      return;
    }

    try {
      const response = await axios.get(endpoint, {
        params: {
          targetUserNo: targetUserNo || signedUserNo,
          signedUserNo: signedUserNo,
        },
      });

      if (response.data.code === "OK") {
        console.log(response.data);

        setUserData({
          nickname: response.data.nickname || "",
          email: response.data.email || "",
          pic: response.data.pic || "https://via.placeholder.com/150",
          userId: response.data.userId || "",
          userStatusMessage: response.data.statusMessage || "",
          myInfo: response.data.targetUserNo === response.data.signedUserNo,
        });
      } else {
        console.error("유저 정보를 가져오는 중 오류 발생:", response.data);
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [targetUserNo, signedUserNo]);

  const handleImageClick = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <Header>
        <h2>마이 페이지</h2>
      </Header>
      <Userinfo>
        <UserProfile>
          {console.log(
            `${import.meta.env.VITE_BASE_URL}/pic/user/${userData.targetUserNo}}`,
          )}
          console.log(userData);
          {userData.pic ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/pic/user/${userData.targetUserNo}/${userData.pic}`}
              // src={userData.pic}
              alt="유저 프로필"
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            />
          ) : (
            <p>유저 사진이 없습니다.</p>
          )}
          <p>{userData.userStatusMessage || "유저 사진 및 정보"}</p>
        </UserProfile>
        <Userpage>
          <UserDetail>
            <Label>아이디</Label>
            <UserId>{userData.userId || "아이디 정보 없음"}</UserId>
          </UserDetail>
          <UserDetail>
            <Label>이메일</Label>
            <Useremail>{userData.email || "이메일 정보 없음"}</Useremail>
          </UserDetail>
          <UserDetail>
            <Label>닉네임</Label>
            <Usernickname>
              {userData.nickname || "닉네임 정보 없음"}
            </Usernickname>
          </UserDetail>
        </Userpage>
      </Userinfo>
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
          onClick={handleClosePopup}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={userData.pic}
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
      {userData.myInfo && (
        <Footer>
          <button
            onClick={() => {
              window.location.href = "/mypage/myedit";
            }}
          >
            정보 변경하기
          </button>
        </Footer>
      )}
    </div>
  );
}

export default MyPage;
