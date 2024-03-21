export interface Member {
  id?: string
  name: string
  join: string
  comeback?: string
  year: string
  birth: string
  gender: string
  etc: string
  state?: boolean
  uid?: string
  target?: string
  pay?: boolean
  special?: string
  total?: number
  totalHost?: number
  break?: boolean
  danger?: boolean
  awardCount?: {
    fClass?: number
    sClass?: number
  }
  topPrizeWinner?: boolean
  secondPriseWinner?: boolean
  [key: `${number}month`]: number
  [key: `${number}monthHost`]: number
  attend?: {
    [key: number]: {
      [key: number]: number
    }
  }
  host?: {
    [key: number]: {
      [key: number]: number
    }
  }
  add?: string
}

export interface Ban {
  id?: string
  name: string
  date: string
  content: string
  state?: boolean
}

export interface Hof {
  [key: string]: string | undefined
  eventName: string
  eventDate: string
  fAward: string
  fClass: string
  fTrack: string
  imgUrl: string
  imgUrl2?: string
  imgUrl3?: string
  imgUrl4?: string
  sAward?: string
  sClass?: string
  sTrack?: string
  tAward?: string
  tClass?: string
  tTrack?: string
  anotherAward?: string
  anotherClass?: string
  anotherTrack?: string
  fLink?: string
  sLink?: string
  tLink?: string
  anotherLink?: string
  fLink2?: string
  sLink2?: string
  tLink2?: string
  anotherLink2?: string
}

export interface Board {
  title: string
  content: string
  date: string
  secret: boolean
  uid: string
  viewCount?: number
  viewUsers?: string[]
  comments: {
    nickName: string
    contents: string
    date: string
    uid: string
  }[]
}

export interface Account {
  name: string
  level: number
}

export interface Schedule {
  date: string
  host: string
  list: string
  title: string
  type: string
}

export type YearData = [string, Schedule[]] | [string, Schedule]

export type MeetData = YearData[]

//state 초기 값
export interface InitialState {
  membersData: [string, Member][]
  meetData: MeetData
  banData: [string, Ban][]
  hofData: [string, Hof][]
  sendMember: Member
  sendBan: Ban
  modalState: boolean
  modalPartState: boolean
  sortDirection : {
    name: number
    join: number
    year: number
    etc: number
    yearPart: number
    monthPart: number
    yearHost: number
    aver: number
  }
  loginUser: {
    uid: string
    name: string
    photoURL: string
    level: number
    state: boolean
    email: string
  }
  accountList : [string, Account][]
  fee: {gold: number}
  isSwiping: boolean
  yearView: number
  monthView: number
}

export interface BuskingData {
  id?: string;
  title: string;
  user: string;
  content: string;
  date: string;
  participants: string;
  location: string;
}