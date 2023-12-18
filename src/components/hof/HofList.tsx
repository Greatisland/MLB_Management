import { HofListContainer, YearIndicator } from "../../style/hallOfFameStyled.tsx"
import HofCard from "./HofCard.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import HofAddModal from "./HofAddModal.tsx"
import { useState, useEffect, useRef } from "react"
import { stopSwiping } from "../../store/slice.ts"
import type { Hof } from "../../store/slice.ts"
import Swal from "sweetalert2"

const HofList = () => {
  const { hofData, loginUser } = useAppSelector(state => state.membersData)
  const dispatch = useAppDispatch()

  const sortHofData = [...hofData].sort((a, b) => {
    return (new Date(b[1].eventDate).getTime() - new Date(a[1].eventDate).getTime())
  })
  const groupedByYear = sortHofData.reduce<{ [key: string]: typeof sortHofData }>((acc, award) => {
    const year = new Date(award[1].eventDate).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(award)
    return acc
  }, {})

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a))

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const [activeYear, setActiveYear] = useState<string | null>(null);

  const [ isModal, setIsModal ] = useState(false)
  const [ sendAward, setSendAward ] = useState<[string, Hof] | undefined>()

  const handleModal = (award: [string, Hof]) => {
    if(loginUser.level >= 2){
      setSendAward(award)
      setIsModal(true)
      dispatch(stopSwiping())
      document.body.classList.add('no-scroll')
    }else{
      Swal.fire({
        icon: 'warning',
        title: '운영진 계정만 수정이 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // IntersectionObserver 인스턴스 생성
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const foundYear = Object.keys(sectionRefs.current).find(year => sectionRefs.current[year] === entry.target);
          if (foundYear) {
            setActiveYear(foundYear);
          }
        }
      });
    }, { threshold: 0.1 });
  
    // 섹션을 observer에 등록
    Object.values(sectionRefs.current).forEach(section => {
      if (section && observer.current) {
        observer.current.observe(section); // observer.current가 null이 아닐 때만 observe 호출
      }
    });
  
    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      if (observer.current) {
        Object.values(sectionRefs.current).forEach(section => {
          if (section && observer.current) {
            observer.current.unobserve(section);
          }
        });
      }
    };
  }, [groupedByYear]); // groupedByYear가 변경될 때 useEffect 재실행

  const handleIndicatorClick = (year: string) => {
    sectionRefs.current[year]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <HofListContainer>
      {sortedYears.map(year => (
        <div 
          key={year} 
        >
          <div 
            ref={el => {
              if (el) {
                sectionRefs.current[year] = el;
              }
            }}
          />
          {groupedByYear[year].map((award, i) => (
            <HofCard key={i} award={award[1]} onClick={() => handleModal(award)} />
          ))}
        </div>
      ))}
      {isModal ? <HofAddModal setIsModal={setIsModal} award={sendAward}/> : null}
    </HofListContainer>
    <YearIndicator>
      {sortedYears.map(year => (
        <div 
          key={year} 
          className={activeYear === year ? 'active' : ''}
          onClick={() => handleIndicatorClick(year)}
        >
          {year}
        </div>
      ))}
    </YearIndicator>
    </>
  )
}

export default HofList