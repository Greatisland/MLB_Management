import { HofAddModalWrapper, HofModalContainer } from "../../style/hallOfFameStyled"
import { ChangeEvent, useState } from "react"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { dbFunc } from "../../firebase/firebaseFunc"
import Swal from "sweetalert2"
import type { Hof } from "../../store/slice"

interface Props {
  setIsModal: (value: boolean) => void
  award?: [string, Hof]
}


const HofAddModal = ({setIsModal, award} : Props) => {
  const storage = getStorage()
  const [ addAward, setAddAward ] = useState(0)
  const [state, setState] = useState<Hof>({
    eventName: award?.[1].eventName || '',
    eventDate: award?.[1].eventDate || '',
    fClass: award?.[1].fClass || '',
    fTrack: award?.[1].fTrack || '',
    imgUrl: award?.[1].imgUrl || '',
    imgUrl2: award?.[1].imgUrl2 || '',
    imgUrl3: award?.[1].imgUrl3 || '',
    imgUrl4: award?.[1].imgUrl4 || '',
    fLink: award?.[1].fLink || '',
    fLink2: award?.[1].fLink2 || '',

    sAward: award?.[1].sAward || '',
    sClass: award?.[1].sClass || '',
    sTrack: award?.[1].sTrack || '',
    sLink: award?.[1].sLink || '',
    sLink2: award?.[1].sLink2 || '',
    tAward: award?.[1].tAward || '',
    tClass: award?.[1].tClass || '',
    tTrack: award?.[1].tTrack || '',
    tLink: award?.[1].tLink || '',
    tLink2: award?.[1].tLink2|| '',
    anotherAward: award?.[1].anotherAward || '',
    anotherClass: award?.[1].anotherClass || '',
    anotherTrack: award?.[1].anotherTrack || '',
    anotherLink: award?.[1].anotherLink || '',
    anotherLink2: award?.[1].anotherLink2 || '',
  })

  const handleCloseModal = () => {
    setIsModal(false)
    document.body.classList.remove('no-scroll')
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>, param: number) => {
    if (e.target.files) {
      const img = e.target.files[0]
      //소괄호 들어가면 styled components에서 불러올 떄 개빡침... 
      const name = img.name.replace(/[(){}[\]]/g, '')
      const storageRef = ref(storage, `HallOfFameList/${name}`)
      uploadBytes(storageRef, img)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
        .then((downloadUrl) => {
          if(param === 1){
            setState({...state, imgUrl: downloadUrl})  
          }else{
            setState({...state, [`imgUrl${param}`]: downloadUrl})
          }
          setIsModal(true)
        })
      })
    }
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(Object.values(state).slice(0, 3).every(value => value !== '')){
      if(award){
        dbFunc.updateHof(award[0], state)
      }else{
        dbFunc.addHof(state)
      }
      handleCloseModal()
    }else{
      Swal.fire({
        html: `
          가요제 필수 정보를 모두 채워주세요!
        `,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: "넹 ㅠㅠ",
      })
    }
  }

  const deleteAward = (hofId: string) => {
    if(hofId !== ''){
      Swal.fire({
        title: `정말로 ${state?.eventName}를 가요제 정보에서 지우시겠어요?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e99797',
        cancelButtonColor: '#4ec6e4',
        confirmButtonText: '지우겠습니다.',
        cancelButtonText: '지우지 않겠습니다.'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: '삭제완료',
            html: `
            ${state.eventName}가 삭제되었어요!
            `,
            showConfirmButton: false,
            timer: 1000
          })
          dbFunc.removeHof(hofId)
        }
      })
    }
    handleCloseModal()
  }

  return(
    <HofAddModalWrapper>
      <HofModalContainer>
        <form onSubmit={handleSubmit}>
          <p>가요제 이름(필수)</p>
          <input type="text" value={state.eventName} onChange={e => setState({...state, eventName: e.target.value})} placeholder="가요제 이름을 입력하세요." />
          <p>가요제 날짜(필수)</p>
          <input type="date" value={state.eventDate} onChange={e => setState({...state, eventDate: e.target.value})} placeholder="날짜를 선택해주세요." />
          
          <br /><hr /><br />
          <p>우승</p>
          <input type="text" value={state.fClass} onChange={e => setState({...state, fClass: e.target.value})} placeholder="여러 명일 경우 ,로 구분 (ex: 김철수, 김영희)" />
          <p>우승 곡 이름</p>
          <input type="text" value={state.fTrack} onChange={e => setState({...state, fTrack: e.target.value})} placeholder="가수 - 곡 제목" />
          <p>우승 Youtube 링크(선택)</p>
          <input type="text" value={state.fLink} onChange={e => setState({...state, fLink: e.target.value})} placeholder="Youtube 링크를 입력하세요." />
          <p>우승 공동수상 Youtube 링크(선택)</p>
          <input type="text" value={state.fLink2} onChange={e => setState({...state, fLink2: e.target.value})} placeholder="공동수상자가 있을 경우 추가 입력하세요." />
          <p>이미지 업로드</p>
          <input type="file" onChange={(e) => handleUpload(e, 1)} />
          {state.imgUrl && <img src={state.imgUrl} alt="Uploaded" />}
          <span>이미지가 업로드 된 걸 확인한 다음 완료를 눌러주세요!</span>

          {new Array(3).fill('').map((_, i) => {
          let kind = ''
          switch (i) {
            case 0 : kind = 's'
            break
            case 1 : kind = 't'
            break
            case 2 : kind = 'another'
          }
          return (
            <>
            {addAward >= i + 1 ? <>
            <br /><hr /><br />
            <p>{i + 2}번 상 이름</p>
            <input type="text" value={state[`${kind}Award` as keyof typeof state]} onChange={e => setState({...state, [`${kind}Award`]: e.target.value})} placeholder="상 이름을 입력하세요."/>
            <p>{i + 2}번상 수상자</p>
            <input type="text" value={state[`${kind}Class`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Class`]: e.target.value})} placeholder="있을 경우 입력하세요." />
            <p>{i + 2}번상 곡 이름</p>
            <input type="text" value={state[`${kind}Track`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Track`]: e.target.value})} placeholder="가수 - 곡 제목" />
            <p>{i + 2}번상 Youtube 링크(선택)</p>
            <input type="text" value={state[`${kind}Link`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Link`]: e.target.value})} placeholder="Youtube 링크를 입력하세요." />
            <p>{i + 2}번상 공동수상 Youtube 링크(선택)</p>
            <input type="text" value={state[`${kind}Link2`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Link2`]: e.target.value})} placeholder="공동수상자가 있을 경우 추가 입력하세요." />
            <p>이미지 업로드</p>
            <input type="file" onChange={(e) => handleUpload(e, 2)} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            {state[`imgUrl${i + 2}` as keyof typeof state] && <img src={state[`imgUrl${i + 2}` as keyof typeof state]} alt="Uploaded" />}
            <span>이미지가 업로드 된 걸 확인한 다음 완료를 눌러주세요!</span>
            </> : null}
            </>
          )
          })}
          {addAward < 3 ? 
          <div className="addBtn" onClick={() => setAddAward(addAward + 1)}>상 추가</div>
          : null
          }   
          <input type="submit" className="submit" value="완료" />
        </form>
        <div className='btnWrapper'>
          <div className="cancle" onClick={handleCloseModal}>취소</div>
          {award ? <div className="delete" onClick={() => {deleteAward(award[0] as string)}}>삭제</div> : null}
        </div>
      </HofModalContainer>
    </HofAddModalWrapper>
  )
}

export default HofAddModal