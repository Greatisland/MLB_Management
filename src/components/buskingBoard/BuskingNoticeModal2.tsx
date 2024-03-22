import { BuskingModalWrapper, BuskingNoticeModalContainer } from "../../style/buskingBoardStyled"
import { dbFunc } from "../../firebase/firebaseFunc"
import React, { useState, useEffect, useRef } from "react"
import { Btn } from "../../style/globalStyled";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { toggleBuskingNoticeModal } from "../../store/slice";

const BuskingNoticeModal2 = () => {
  const { modalBuskingNoticeState } = useAppSelector(state => state.membersData)
  const dispatch = useAppDispatch()
  return (
    <>
    {modalBuskingNoticeState && 
    <BuskingModalWrapper onClick={() => dispatch(toggleBuskingNoticeModal())}>
      <BuskingNoticeModalContainer>
        버스킹 확인사항
      </BuskingNoticeModalContainer>
    </BuskingModalWrapper>}
    </>

  )
}

export default BuskingNoticeModal2