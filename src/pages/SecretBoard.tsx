import Footer from "../components/Footer"
import { SecretBoardContainer } from "../style/secretBoardStyled"
const SecretBoard = () => {
  return (
    <SecretBoardContainer>
      <p>통계를 넣어보려고 했는데 1~5월까지의 데이터가 부족한데다 통계 그래프를 그리기 위해 수집해야 할 데이터도 많아 힘들어서 대체용도로 이 자리엔
        익명 게시판이 개설될 예정입니다. 작성자는 익명이며 운영진 외 비공개 설정 옵션으로 익명제보도 가능하도록 만들 예정입니다!</p>
      <Footer />
    </SecretBoardContainer>
  )
}

export default SecretBoard