import Swal from "sweetalert2";

export const isLogin = async ({ navigate, cookies }) => {
  const isCookie = await cookies.signedUserNo;

  if (isCookie === "undefined") {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: "로그인이 필요합니다",
    });
    setTimeout(() => {
      navigate(`/signin`);
    }, 2000);
  } else {
    return;
  }
};

// 쿠키의 signedUserNo에 값이 없으면 로그인 하라는 알림창과 함께 이전 페이지로 이동

// const [cookies] = useCookies("signedUserNo");
// const navigate = useNavigate();

// useEffect(() => {
//   isLogin({ navigate, cookies });
// }, []);
