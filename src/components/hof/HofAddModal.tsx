import { HofAddModalWrapper, HofModalContainer } from "../../style/hallOfFameStyled.tsx"
import { ChangeEvent, useState, useEffect } from "react"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { dbFunc } from "../../firebase/firebaseFunc.ts"
import Swal from "sweetalert2"
import { startSwiping, stopSwiping } from "../../store/slice.ts"
import { useAppDispatch } from "../../store/hook.ts"
import type { Hof } from "../../store/type.ts"

interface Props {
  setIsModal: (value: boolean) => void
  award?: [string, Hof]
}


const HofAddModal = ({setIsModal, award} : Props) => {
  const dispatch = useAppDispatch()

  //좌우 스와이프 페이지이동 컨트롤 (페이지 오픈시 비활성, 페이지 벗어날 시 활성)
  useEffect(() => {
    dispatch(stopSwiping())
    return () => {
      dispatch(startSwiping())
    }
  }, [])
  
  const storage = getStorage()
  const [state, setState] = useState<Hof>({
    eventName: award?.[1].eventName || '',
    eventDate: award?.[1].eventDate || '',
    fAward: award?.[1].fAward || '우승',
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
    anotherLink2: award?.[1].anotherLink2 || ''
  })

  //상이 몇개나 추가되었는지
  const [ addAward, setAddAward ] = useState(1)

  //추가된 상의 갯수에 따라 초기 렌더링 때 추가ui 오픈
  useEffect(() => {
    const calculateAwardCount = () => {
      if (award?.[1]?.anotherAward) return 4
      if (award?.[1]?.tAward) return 3
      if (award?.[1]?.sAward) return 2
      return 1
    }
    setAddAward(calculateAwardCount())
  }, [])

  const handleCloseModal = () => {
    setIsModal(false)
    document.body.classList.remove('no-scroll')
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>, param: number) => {
    if (e.target.files) {
      const img = e.target.files[0]
      //소괄호 들어가면 styled components에서 불러올 떄 개빡침... 
      const timestamp = new Date().getTime()
      const name = img.name.replace(/[(){}[\]]/g, '') + '-' + timestamp
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
        title: `정말로 ${state?.eventName}를 수상 정보에서 지우시겠어요?`,
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
          handleCloseModal()
        }
      })
    }
  }

  return(
    <HofAddModalWrapper>
      <HofModalContainer>
        <form onSubmit={handleSubmit}>
          <p>수상 이름(필수)</p>
          <input type="text" value={state.eventName} onChange={e => setState({...state, eventName: e.target.value})} placeholder="가요제 이름을 입력하세요." />
          <p>수상 날짜(필수)</p>
          <input type="date" value={state.eventDate} onChange={e => setState({...state, eventDate: e.target.value})} placeholder="날짜를 선택해주세요." />

          {new Array(4).fill('').map((_, i) => {
          let kind = ''
          switch (i) {
            case 0 : kind = 'f'
            break
            case 1 : kind = 's'
            break
            case 2 : kind = 't'
            break
            case 3 : kind = 'another'
          }
          return (
            <>
            {addAward >= i + 1 ? <>
            <br /><hr /><br />
            <p>{i + 1}번 상 이름</p>
            <input type="text" value={state[`${kind}Award` as keyof typeof state]} onChange={e => setState({...state, [`${kind}Award`]: e.target.value})} placeholder="상 이름을 입력하세요."/>
            <p>{i + 1}번 상 수상자</p>
            <input type="text" value={state[`${kind}Class`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Class`]: e.target.value})} placeholder="여럿일 경우 ,로 구분해서 입력하세요." />
            <p>{i + 1}번 상 곡 이름</p>
            <input type="text" value={state[`${kind}Track`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Track`]: e.target.value})} placeholder="가수 - 곡 제목" />
            <p>{i + 1}번 상 Youtube 링크(선택)</p>
            <input type="text" value={state[`${kind}Link`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Link`]: e.target.value})} placeholder="Youtube 링크를 입력하세요." />
            <p>{i + 1}번 상 공동수상 Youtube 링크(선택)</p>
            <input type="text" value={state[`${kind}Link2`  as keyof typeof state]} onChange={e => setState({...state, [`${kind}Link2`]: e.target.value})} placeholder="공동수상자가 있을 경우 추가 입력하세요." />
            <p>이미지 업로드</p>
            <input type="file" onChange={(e) => handleUpload(e, i + 1)} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            {i + 1 === 1 ? state.imgUrl && <img src={state.imgUrl} alt="Uploaded" /> :
            state[`imgUrl${i + 1}` as keyof typeof state] && <img src={state[`imgUrl${i + 1}` as keyof typeof state]} alt="Uploaded" />
            }
            <span>여기에 이미지가 나오는 걸 확인한 다음 완료를 눌러주세요!</span>
            </> : null}
            </>
          )
          })}
          {addAward < 4 ? 
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