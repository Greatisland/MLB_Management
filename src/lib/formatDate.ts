  export const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(5, 7);
    const day = dateStr.substring(8, 10);
    return `${year.substring(2, 4)}년 ${month}월 ${day}일`;
  }