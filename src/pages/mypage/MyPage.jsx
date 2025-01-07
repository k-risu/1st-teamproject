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
  const location = useLocation();
  const [cookies] = useCookies(["signedUserNo"]);
  const { targetUserNo } = useParams();
  const [isUser, setIsUser] = useState(false);

  const [clickUserNo, setClickUserNo] = useState(() => {
    if (
      parseInt(location.state?.targetUserNo) === parseInt(cookies.signedUserNo)
    ) {
      setIsUser(true); // targetUserNo와 signedUserNo가 동일하면 true
      return location.state?.targetUserNo;
    } else {
      setIsUser(false); // 아니면 false
      return cookies.signedUserNo;
    }
  });

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nickname: "",
    email: "",
    pic: "",
    userId: "",
    userStatusMessage: "",
    myInfo: null,
  });
  const [imageSrc, setImageSrc] = useState("/default_profile.jpg");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const signedUserNo = parseInt(cookies.signedUserNo);

  // const fetchUserData = useCallback(async () => {
  //   const endpoint = "/api/user";

  //   if (!signedUserNo) {
  //     console.error("signedUserNo is missing");
  //     return;
  //   }

  //   // 로그 추가: fetchUserData 호출 전 상태 확인
  //   console.log("fetchUserData 호출 - clickUserNo:", clickUserNo);
  //   console.log("fetchUserData 호출 - signedUserNo:", signedUserNo);

  //   try {
  //     const response = await axios.get(endpoint, {
  //       params: {
  //         targetUserNo: location.state?.targetUserNo,
  //         signedUserNo: signedUserNo,
  //       },
  //     });
  //     console.log(response);

  //     console.log("API response:", response.data);

  //     if (response.data.code === "OK") {
  //       setUserData({
  //         nickname: response.data.nickname.replace(/#0000/g, "").split("#")[0],
  //         email: response.data.email,
  //         pic: response.data.pic,
  //         // pic: response.data.pic || "default_profile.jpg",
  //         userId: response.data.userId,
  //         userStatusMessage: response.data.statusMessage || "",
  //         myInfo: response.data.myInfo,
  //       });
  //     } else {
  //       console.error("Failed to fetch user data:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //   }
  // }, [clickUserNo, signedUserNo]);

  // useEffect(() => {
  //   if (location.state || clickUserNo) {
  //     fetchUserData();
  //   }
  // }, [fetchUserData, location.state, clickUserNo]); // 의존성에 clickUserNo 추가

  useEffect(() => {
    const fetchUserData = async () => {
      const endpoint = "/api/user";

      if (!signedUserNo) {
        console.error("signedUserNo is missing");
        return;
      }

      // 로그 추가: fetchUserData 호출 전 상태 확인
      console.log("fetchUserData 호출 - clickUserNo:", clickUserNo);
      console.log("fetchUserData 호출 - signedUserNo:", signedUserNo);

      try {
        const response = await axios.get(endpoint, {
          params: {
            targetUserNo: location.state?.targetUserNo,
            signedUserNo: signedUserNo,
          },
        });
        console.log(response);

        console.log("API response:", response.data);

        if (response.data.code === "OK") {
          setUserData({
            nickname: response.data.nickname
              .replace(/#0000/g, "")
              .split("#")[0],
            email: response.data.email,
            pic: response.data.pic,
            // pic: response.data.pic || "default_profile.jpg",
            userId: response.data.userId,
            userStatusMessage: response.data.statusMessage || "",
            myInfo: response.data.myInfo,
          });
        } else {
          console.error("Failed to fetch user data:", response.data);
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("userData.pic 변경 감지:", userData.pic);
    if (userData.pic) {
      const newImageSrc = `${import.meta.env.VITE_BASE_URL}/pic/user/${clickUserNo}/${userData.pic}`;
      setImageSrc(newImageSrc);
    }
  }, [userData.pic, targetUserNo, signedUserNo]);

  const handleImageClick = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const userEditClick = (e) => {
    console.log(e);

    navigate(`/mypage/edit`, {
      state: {
        targetUserNo: clickUserNo || signedUserNo,
        userId: e.userId,
        email: e.email,
        nickname: e.nickname,
        pic: e.pic,
        userStatusMessage: e.userStatusMessage,
        myInfo: e.myInfo,
      },
    });
  };

  return (
    <Layout>
      <Header>
        <h2>{userData.nickname} 의 페이지</h2>
      </Header>
      <Userinfo>
        <UserProfile>
          {userData.pic === null ? (
            <img
              src="/default_profile.jpg"
              alt="기본 프로필"
              style={{
                borderRadius: "50px",
                width: "100px",
                height: "100px",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
              }}
            />
          ) : (
            <img
              src={imageSrc}
              alt="프로필"
              style={{
                borderRadius: "50px",
                width: "100px",
                height: "100px",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
              }}
              onClick={handleImageClick}
            />
          )}
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
              src={imageSrc || "/default_profile.jpg"}
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
      {isUser && (
        <Footer>
          <button onClick={() => userEditClick(userData)}>정보 변경하기</button>
        </Footer>
      )}
    </Layout>
  );
}

export default MyPage;
