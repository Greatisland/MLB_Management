import Footer from "../components/common/Footer.tsx"
import { useState, useEffect } from "react"
import { dbFunc } from "../firebase/firebaseFunc.ts"
import { useAppSelector } from "../store/hook.ts"
import Waiting from "../components/common/Waiting.tsx"
import GfIcon from "../components/common/GfIcon.tsx"
import { BuskingBoardContainer, BuskingModalWrapper, BuskingModalContainer } from "../style/buskingBoardStyled.tsx"
import BuskingModal from "../components/buskingBoard/BuskingModal.tsx"
import { Button } from "@mui/material"
import type { BuskingData } from "../store/type.ts"


const BuskingBoard = () => {
  const { loginUser } = useAppSelector(state => state.membersData)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<BuskingData[]>([]);

  useEffect(() => {
    const fetchArticles = () => {
      dbFunc.getBuskingBoard((data: [string, BuskingData][]) => {
        const fetchedArticles = data.map(([id, article]) => ({
          id,
          ...article,
        }));
        setArticles(fetchedArticles);
      });
    };

    fetchArticles();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: BuskingData) => {
    // 서버로 데이터 전송 또는 상태 업데이트 등의 로직 수행
    console.log(data);
  };
  
  return (
    <>{loginUser.level >= 1 ?
    <BuskingBoardContainer>
      <h1>버스킹 게시판</h1>
      <Button onClick={openModal}>버스킹 등록</Button>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>일시: {article.date}</p>
            <p>참여자: {article.participants}</p>
            <p>장소: {article.location}</p>
          </li>
        ))}
      </ul>

      <BuskingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
      <Footer />
      <GfIcon />
    </BuskingBoardContainer> :
    <Waiting />}
    </>
  )
}

export default BuskingBoard