<div align="center">
  <h1 align="center">MLB Management</h3>

  <p align="center">
    부산의 노래모임인 뮤라밸의 회원관리 어플리케이션
    <br />
    <a href="https://mlb-management.vercel.app"><strong>배포: Vercel</strong></a><br />
    <a href="https://play.google.com/store/apps/details?id=app.vercel.mlb_management.twa&hl=ko&gl=US"><strong>구글 플레이스토어</strong></a>
  </p>
</div>

## 프로젝트에 대해

<strong>참여자</strong> : 김현진 (단독 프로젝트)
<br />
<strong>제작 기간</strong> : 약 3주

- 부산에 실제 존속하는 모임인 뮤라밸의 회원관리를 위한 어플리케이션입니다.<br />
- 회원가입, 회원정보 추가/제거, 참석관리 및 참석정보 통계, 회비납부관리, 가요제 수상 명예의 전당 리스트 관리 등의 기능을 제공합니다.<br />
- admin 계정을 분리하여 계정에 따라 보여지는 정보 및 접근할 수 있는 기능을 단계적으로 제한하였습니다.<br />
- Naver Band를 크롤링하여 회원들의 참석 정보를 받아옵니다.
- 백엔드 서버는 파이어베이스를 사용하여 구성하였습니다.<br />
- 기본 베이스는 리액트이며, PWA(Progressive Web App)으로 제작하여 모바일 환경에서도 앱으로 사용 가능합니다.<br />
- PWA를 바탕으로 구글 플레이스토어에 출시했습니다. (구글 플레이스토어 검색: 뮤라밸 매니지먼트)

<br /><br /><br />

## 사용된 스택
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React Router-20232A?style=for-the-badge&logo=reactrouter&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Redux Toolkit-20232A?style=for-the-badge&logo=redux&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=FFCA28">
<img src="https://img.shields.io/badge/React.Chart.js2-FF6384?style=for-the-badge&logo=chartjs&logoColor=FF6384">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodejs&logoColor=339933">
<img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=40B5A4">
<br /><br />

## 주요 기능

- 회원가입 / 로그인 (Firebase 기반으로 구현)
- 회원추가 / 정보수정
- 회원의 다양한 정보에 따라 Badge 조건부 렌더링
- 회원의 휴식기 및 차단리스트 별도 구현
- 운영진 이상부터는 해당 앱의 정보에 접근하여 수정 및 추가가 가능함
- 모든 회원의 올해 참석 횟수, 이번달 참석 횟수, 평균 참석 횟수를 리스트 및 그래프로 확인 가능
- 회원들의 가요제 시상 정보 및 가요제 개설 상세정보 확인 가능
- 칭찬게시판(익명게시판)으로 CRUD 구현 및 댓글, 조회수 확인가능
- 가입일 및 회원상태에 따라 회비대상자와 비대상자를 구분하고 모임의 회비를 관리 가능.
- 회원의 등급(일반회원/운영진/총무/모임장)에 따라 접근할 수 있는 기능과 정보에 차등 제한
- 좌우로 터치 슬라이드 시 페이지 라우팅
- 모임의 월별 / 연도별 통계 그래프
