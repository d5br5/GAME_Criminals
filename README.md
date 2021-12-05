# 범죄자 관상 테스트

<p align="center"><img src="https://user-images.githubusercontent.com/40906871/144459871-289ae68f-4900-4c96-b237-9f9ee5737398.png" height="230"/><img src="https://user-images.githubusercontent.com/40906871/144459956-016f1f13-c28f-45bb-804f-01c2fc4425a2.png" height="230"/><img src="https://user-images.githubusercontent.com/40906871/144460081-b6239ecc-e3ea-4cfb-abf1-3175573dfb70.png" height="230"/></p>

## About the Project

### Purpose
- 웹브라우저에서 동작하는 게임을 제작한다.
- 서버 및 데이터베이스 기능을 제공하는 Firebase의 사용법을 익힌다. 
- React 프레임워크를 사용하여 프론트엔드를 구성한다.

### Deploy

- Tool : Vercel
- https://criminals-game.vercel.app/

### Built with

- HTML
- CSS
- Javascript
- React
- Firebase
- MaterialUI

### Install

:boom: Clone this -> $ npm install -> $ yarn start -> 실행 후 브라우저 콘솔에 'FirebaseAppImpl' 객체 출력되는지 확인 :boom:
:boom: 코드 작성 중 발생하는 모든 문제는 이슈에 남겨주세요. :boom:

## Details

### 개요
- 회원가입 및 로그인 / 구글 계정으로 진행 가능. 로그인 에러시 에러내용 출력됨.
- 회원가입, 구글 계정 최초 로그인시 DB 'user' collection에 uid, level, nickname, point 를 필드로 갖는 문서 생성
- 비로그인시 로그인화면만 출력. 로그인시 메인으로 이동.
- user 및 game 정보 loading 미완시 Loading 화면 출력
- 내부 라우팅은 /home, /game1, /game2, /profile, /ranking 으로 구성 (React-Router-Dom 사용)
- route별 세부 기능은 하단 항목 참조

### firebase DB 
- crimes : index, crime   
- criminals : index, crime, additional crime, crime record, name, sentence
- users : uid, nickname, level, point
- 범죄자 사진은 Storage에 저장. 해당 범죄자의 index를 사진명으로 저장하여 연동.

### 레벨
- 랭크 제도. 전체 유저를 포인트 순으로 나열 후 일정 비율 구간으로 분할하여 등급 부여
    - ex) Lv1 40% / Lv2 30% / Lv3 20% / Lv4 10%
- 유저 포인트 변동시 그에 따라 타 유저들의 레벨 자동으로 변동

### /main
- Game1, Game2 선택 가능
- Game1 : 범죄자 죄목 추측 / Game2 : 범죄자 형량 대결
- Game 선택 시 해당 game route 로 이동
- 이동 후 첫 화면에는 해당 게임 룰 출력. Game Start 버튼으로 게임 시작
- 게임 종료 후 최종 스코어 (100점 만점) 공개. 이에 상응하는 포인트 획득
- 획득된 포인트는 firebase user collection에 자동으로 반영.

#### game 1 : 범죄자 죄목 추측
- 10라운드로 구성 
- DB에 저장된 한 범죄자의 사진과 이름이 화면 상에 출력
- 해당 범죄자가 저질렀을 것 같은 범죄의 죄목을 선택, 이후 즉시 정답 공개

#### game 2 : 범죄자 형량 대결
- 5라운드로 구성
- DB에 저장된 두 범죄자의 사진과 이름이 화면 상에 출력
- 형량이 높을 것 같은 사람을 관상만으로 선택, 이후 즉시 정답 공개

### /profile
- 로그인한 유저의 닉네임, 포인트, 레벨 확인 가능
- 로그아웃 가능

### /ranking
- 전체 유저의 순위, 닉네임, 포인트, 레벨 확인 가능 (포인트 내림차순)
- 유저들의 포인트 변동시 그에 따라 레벨이 실시간으로 변동
