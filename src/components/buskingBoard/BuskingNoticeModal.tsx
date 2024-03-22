import { BuskingModalWrapper, BuskingNoticeModalContainer } from "../../style/buskingBoardStyled"
import { dbFunc } from "../../firebase/firebaseFunc"
import React, { useState, useEffect, useRef } from "react"
import { Btn } from "../../style/globalStyled";
import { useAppSelector } from "../../store/hook";

const BuskingNoticeModal = ({setIsModal}: {setIsModal: (param: boolean) => void}) => {
  const { loginUser } = useAppSelector(state => state.membersData) 
  const [notice, setNotice] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //글 정보 가져오기
  useEffect(() => {
    dbFunc.getBuskingNotice().then((data) => {
      setNotice(data.content)
    })
  }, [])

  const resizeHeight = (
    textareaRef: React.RefObject<HTMLTextAreaElement>,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if(textareaRef.current){
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
      setNotice(e.target.value)
    }
  }

  const handleNotice = () => {
    dbFunc.updateBuskingNotice({content: notice})
  }

  return (
    <BuskingModalWrapper>
      <BuskingNoticeModalContainer>
        {loginUser.level >= 2 ? 
        <><textarea
          value={notice}
          onChange={(e) => resizeHeight(textareaRef, e)}
          ref={textareaRef}
          required
        ></textarea>
        <Btn onClick={() => {
          handleNotice()
          document.body.classList.remove('no-scroll'),
          setIsModal(false)
        }}><p>공지사항 수정</p></Btn>
        </>
        :
        <>
        <pre>{notice}</pre>
        <Btn onClick={() => {
          document.body.classList.remove('no-scroll'),
          setIsModal(false)
        }}><p>확인</p></Btn>
        </>}
      </BuskingNoticeModalContainer>
    </BuskingModalWrapper>
  )
}

export default BuskingNoticeModal