import Footer from "../components/common/Footer.tsx"
import { useState, useEffect } from "react"
import { dbFunc } from "../firebase/firebaseFunc.ts"
import { useAppSelector } from "../store/hook.ts"
import Waiting from "../components/common/Waiting.tsx"
import GfIcon from "../components/common/GfIcon.tsx"
import { BuskingBoardContainer, BuskingAddBtn } from "../style/buskingBoardStyled.tsx"
import BuskingModal from "../components/buskingBoard/BuskingModal.tsx"
import BuskingList from "../components/buskingBoard/BuskingList.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import type { BuskingData } from "../store/type.ts"
import { IoMdAddCircle } from "react-icons/io";
import { useAppDispatch } from "../store/hook.ts"
import { sendBusking, toggleBuskingModal } from "../store/slice.ts"

const BuskingBoard = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const [articles, setArticles] = useState<BuskingData[]>([]);
  const dispatch = useAppDispatch()

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

  return (
    <>{loginUser.level >= 1 ?
    <BuskingBoardContainer>
      <BuskingAddBtn onClick={() => {
        dispatch(sendBusking({
          id: '',
          title: '',
          content: '',
          date: '',
          participants: [],
          location: ''
        })),
        dispatch(toggleBuskingModal())
      }}>
        <IoMdAddCircle /><span>버스킹 일정 추가하기</span>
      </BuskingAddBtn>

      <BuskingList articles={articles} />

      <BuskingModal />
      <div style={{width: '100%', height: '120px'}} />
      <ScrollToTopBtn />
      <Footer />
      <GfIcon />
    </BuskingBoardContainer> :
    <Waiting />}
    </>
  )
}

export default BuskingBoard