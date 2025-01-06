import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  Layout,
} from "./MyPage.styled";

function MyPage() {
  const location = useLocation(); // ✅ `useLocation()`을 먼저 선언
  const [clickUserNo, setClickUserNo] = useState(
    location.state?.targetUserNo || null,
  );
  const [cookies] = useCookies(["signedUserNo"]); // 쿠키에서 signedUserNo 가져오기
  const { targetUserNo } = useParams(); // URL에서 targetUserNo 가져오기
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nickname: "로그인 전 테스트 유저", // 임의 닉네임
    email: "testuser@example.com", // 임의 이메일
    pic: location.state?.updatedPic || "public/default_profile.jpg", // 🔥 최신 pic 적용
    userId: "로그인 전 testID123", // 임의 유저 ID
    userStatusMessage: "상태 메시지 테스트", // 임의 상태 메시지
    myInfo: true, // 정보 변경 버튼이 표시되도록 설정
  });
  // ✅ 이미지 상태 추가
  const [imageSrc, setImageSrc] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const signedUserNo = cookies.signedUserNo;

  // fetchUserData 함수 선언 (useCallback으로 변경)
  const fetchUserData = useCallback(async () => {
    const endpoint = "/api/user";

    if (!signedUserNo) {
      console.error("필수 값(signedUserNo)이 누락되었습니다.");
      return;
    }

    try {
      const response = await axios.get(endpoint, {
        params: {
          targetUserNo: clickUserNo ? clickUserNo : signedUserNo,
          signedUserNo: signedUserNo,
        },
      });

      console.log("API 응답 데이터:", response.data);

      if (response.data.code === "OK") {
        console.log("업데이트할 프로필 이미지:", response.data.pic);

        setUserData((prevData) => ({
          ...prevData,
          nickname: response.data.nickname
            ? response.data.nickname
                .replace(/#0000/g, "")
                .split("#")
                .slice(0, 2)
                .join("#")
            : "",
          email: response.data.email || "",
          pic: response.data.pic || "/default_profile.jpg", // ✅ 기본 이미지 설정
          userId: response.data.userId || "",
          userStatusMessage: response.data.statusMessage || "",
          myInfo: response.data.targetUserNo === response.data.signedUserNo,
        }));
      } else {
        console.error("유저 정보를 가져오는 중 오류 발생:", response.data);
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  }, [targetUserNo, signedUserNo]);

  // ✅ `useEffect`를 통해 데이터 갱신
  useEffect(() => {
    if (location.state) {
      fetchUserData();
    }
  }, [fetchUserData, location.state]); // 🔥 `location.state` 추가

  // ✅ `userData.pic` 변경될 때 `imageSrc` 업데이트
  useEffect(() => {
    if (userData.pic) {
      const newImageSrc = `${import.meta.env.VITE_BASE_URL}/pic/user/${targetUserNo || signedUserNo}/${userData.pic}`;
      setImageSrc(newImageSrc);
      console.log("📸 이미지 src 업데이트됨:", newImageSrc);
    }
  }, [userData.pic, targetUserNo, signedUserNo]);

  // ✅ `userData.pic` 변경 감지 로그
  useEffect(() => {
    console.log("🖼️ 이미지 업데이트 감지:", userData.pic);
  }, [userData.pic]);

  // ✅ 프로필 이미지 클릭 시 팝업 열기
  const handleImageClick = () => setIsPopupOpen(true);

  // ✅ 팝업 닫기
  const handleClosePopup = () => setIsPopupOpen(false);

  // ✅ 유저 정보 수정 페이지 이동
  const userEditClick = (e) => {
    console.log(e);

    navigate(`/mypage/edit`, {
      state: {
        targetUserId: e.userId,
      },
    });
  };

  console.log("✅ VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
  console.log("✅ userData.pic:", userData.pic);
  console.log(
    "✅ 최종 이미지 URL:",
    `${import.meta.env.VITE_BASE_URL}/pic/user/${targetUserNo || signedUserNo}/${userData.pic}`,
  );

  return (
    <Layout>
      <Header>
        {userData.myInfo === true ? <h2>마이 페이지</h2> : userData.nickname}
        {console.log("여기:", userData)}
      </Header>
      <Userinfo>
        <UserProfile>
          {userData.pic ? (
            <img
              src={imageSrc || "/default_profile.jpg"} // ✅ 최신 이미지 적용
              alt="프로필"
              style={{
                borderRadius: "50px",
                width: "100px",
                height: "100px",
                cursor: "pointer",
              }}
              onClick={handleImageClick} // ✅ 이미지 클릭 시 팝업 열기
            />
          ) : (
            <img src="/default_profile.jpg" alt="" />
          )}
          {/* <p>{userData.userStatusMessage || "statusMessage 영역"}</p> */}
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
        </UserProfile>
      </Userinfo>
      {/* ✅ 프로필 이미지 확대 팝업 */}
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
              src={imageSrc || "/default_profile.jpg"} // ✅ 최신 이미지 적용
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

      {/* ✅ 정보 변경 버튼 */}
      {userData.myInfo && (
        <Footer>
          <button
            // onClick={() => {
            //   window.location.href = `/mypage/myedit?targetUserNo=${signedUserNo}`;
            // }}
            onClick={() => userEditClick(userData)}
          >
            정보 변경하기
          </button>
        </Footer>
      )}
    </Layout>
  );
}

export default MyPage;
