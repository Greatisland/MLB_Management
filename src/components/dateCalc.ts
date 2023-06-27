export const dateCalc = (param: string) => {
  const date = new Date()
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1).padStart(2,'0')
  //날짜 계산
  const day = String(date.getDate()).padStart(2,'0')
  if(param === 'year'){
    return year
  }else if(param === 'month'){
    return month
  }else if(param === 'day'){
    return day
  }else if(param === 'flatMonth'){
    return String(date.getMonth() + 1)
  }
}