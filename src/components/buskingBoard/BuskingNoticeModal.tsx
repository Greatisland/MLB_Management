import { BuskingModalWrapper, BuskingNoticeModalContainer } from "../../style/buskingBoardStyled"

const BuskingNoticeModal = ({setIsModal}: {setIsModal: (param: boolean) => void}) => {
  return (
    <BuskingModalWrapper onClick={() => setIsModal(false)}>
      <BuskingNoticeModalContainer>
        테스트중입니다.
      </BuskingNoticeModalContainer>
    </BuskingModalWrapper>
  )
}

export default BuskingNoticeModal