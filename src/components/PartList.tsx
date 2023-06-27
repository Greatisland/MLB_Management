import { PartListContainer } from "../style/PartPageStyled"

const PartList = () => {
  return (
    <PartListContainer>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>올해 참여횟수</th>
            <th>이번 달 참여횟수</th>
            <th>참여 비율</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>321</td>
            <td>312</td>
            <td>321</td>
            <td>321</td>
          </tr>
          <tr>
            <td>321</td>
            <td>312</td>
            <td>321</td>
            <td>321</td>
          </tr>
          <tr>
            <td>321</td>
            <td>312</td>
            <td>321</td>
            <td>321</td>
          </tr>
        </tbody>
      </table>
    </PartListContainer>
  )
}

export default PartList