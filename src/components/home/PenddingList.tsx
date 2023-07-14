import { HomeListContainer } from "../../style/homeStyled"
import { useAppSelector } from "../../store/hook"
import Swal from "sweetalert2"
import { dbFunc } from "../../firebase/firebaseFunc"
import { LinearProgress } from "@mui/material"


const PenddingList = () => {
  const { accountList, loginUser } = useAppSelector(state => state.membersData)
  const handleAddAccount = (account: any) => {
    //레벨 2 이상부터 운영진
    if(loginUser.level >= 2){
      Swal.fire({
        title: `${account[1].name}님의 계정을 승인할까요?`,
        text: "승인할 경우 해당 계정은 이 어플을 이용할 수 있습니다.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e99797',
        cancelButtonColor: '#4ec6e4',
        confirmButtonText: '네.',
        cancelButtonText: '아니요.'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: '완료',
            html: `
            승인 완료되었습니다!
            `,
            showConfirmButton: false,
            timer: 1000
          })
          dbFunc.updateAccount(account[0], {...account[1], level: 1})
          return
        }else{
          dbFunc.removeAccount(account[0])
        }
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: '운영진 계정만 수정이 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }
  const penddingList = accountList.filter(account => account[1]?.level < 1)
  return (<>
    {loginUser.level >= 2 && penddingList.length !== 0 ? 
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th className="pendding">계정 승인대기</th>
          </tr>
        </thead>
        <tbody>
          {penddingList.map((account, i) => (
            <tr key={i} onClick={() => handleAddAccount(account)}>
              <td className="pendding">{account[1]?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <LinearProgress color="inherit"  />
    </HomeListContainer> : null}</>
  )
}

export default PenddingList