const KakaoLogin = () => {
  const CLIENT_ID = `6ac3c9e09d2ab4b2a56f587cd4d31099`;
  const REDIRECT_URI = `https://hyeonjin-dev-upgraded-waffle-55vg9x9q9r34rx4-5174.preview.app.github.dev/oauth`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

  return(
    <div className="loginBtn">카카오 로그인</div>
  )
}

export default KakaoLogin;