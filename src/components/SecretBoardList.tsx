import { SecretBoardListContainer } from "../style/secretBoardStyled"

const SecretBoardList = () => {
  const dummy = new Array(10).fill({title: '제목', content: '내용', date: '2002-11-11'})
  return (
    <SecretBoardListContainer>
      {dummy.map((article, i) => (
        <div className="list" key={i}><span>{article.title}</span><span>{article.date}</span></div>
      ))}
    </SecretBoardListContainer>
  )
}

export default SecretBoardList