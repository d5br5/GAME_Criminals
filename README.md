## 시작하기 전에

:boom: Clone this -> $ npm install -> $ yarn start -> 실행 후 브라우저 콘솔에 'FirebaseAppImpl' 객체 출력되는지 확인 :boom:

:boom: yarn 시작 전에 _fbase.js_ 파일을 src 디렉토리 안에 넣어 주세요. :boom:

:boom: 코드 작성 중 발생하는 모든 문제는 이슈에 남겨주세요. :boom:

```javascript
** fbase.js **

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase console 에서 project 생성 후 발급받은 key 복붙
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
```

### firebase key 발급 방법

- firebase 홈페이지 접속 후 구글 로그인: https://firebase.google.com/
- 우측 상단 '콘솔로 이동' 버튼 클릭
- '프로젝트 추가' 클릭
- 프로젝트 이름 아무거나 입력 (ex. team6) 후 '계속'
- 이 프로젝트에서 Google 애널리틱스 사용 설정 '해제'
- 프로젝트 생성 후, '앱을 추가하여 시작하기' 부분 버튼 중 '</>' 클릭
- 앱 닉네임 아무거나 입력(team6), 호스팅 설정 '체크X'
- 발급된 SDK 문서에 존재하는 key 복사 후 firebase.js에 붙여넣기


## PROJECT - 범죄자 관상 테스트
### DB
- 범죄자 : 이름, 사진, 죄목, 형량
- 유저 : 계정, 닉네임, 푼 문제사진, 완료 경기 수, 티어, 포인트

### 레벨
- 게임 '리그오브레전드' 와 유사한 랭크 제도
- 전체 유저를 포인트 순으로 나열 후 일정 비율 구간으로 분할하여 등급 부여
- ex) Lv1 40% / Lv2 30% / Lv3 20% / Lv4 10%

### 게임
- '게임시작' 버튼 클릭으로 시작
- DB에 저장된 사진과 이름이 화면 상에 2쌍 출력 (ex. '김길동, 사진' vs '홍길동, 사진')
- 형량이 높을 것 같은 사람을 관상만으로 선택, 이후 즉시 정답 공개
- 총 10세트 진행 후 게임 종료. 종료 후 최종 스코어 (x개/10개) 출력
- 경험치 획득 (0-2개 : 강한 하락 / 3-4개 : 약한 하락 / 5-6개 : 변동X / 7-8개 : 약한 상승 / 9-10개 : 강한 상승)

### 유저 프로필
- 계정, 닉네임, 완료 경기 수, 티어, 포인트 확인 가능

### 랭킹
- 티어별(포인트별) 내림차순 정렬


## 공지사항
### project

- OPEN API + firebase를 이용한 웹 어플리케이션을 제작
- 조별주제는 https://docs.google.com/spreadsheets/d/1cysxO9JDLIQH0y6yMfmX8KUYX-H2HyHp9BjaRMaBl-U/edit#gid=0 


### library

- react, github 이용을 필수로 한다.
- 별도의 외부 라이브러리 사용할 수 있다.


### 발표

- 발표는 4,3,1,2,7,6,5 조 순으로 한다.
- 발표 자료는 23일 18시 이전 mongmaker721@gmail.com 으로 제출한다.
- 발표는 
  - 발표 주제
  - 과제 하면서 제일 중심을 뒀던 부분
  - 실제 제품 실행
  - 개발하면서 실제 겪은 에로사항 및 해결방안
을 기반으로 발표한다. 총 발표시간은 조별로 10~15분 가량이다.
- ppt에 심한 공을 기울이지 말 것.
- 발표 평가는 강사 평가(20) + 조별 평가(80)으로, 발표전에 미리 제공하는 채점표에 의거하여 각 개인이 다른 조를 평가한다.
- 점표는 주제, 문제해결, 제품의 마감 세 가지를 기본으로 하여 제공된다.

### code

- 코드는 github.com public repository 로 제출한다.
- 각 조별로 해당 깃헙 이슈로 repo url을 남긴다.
- 코드의 평가는 repo의 마스터 브랜치의 23일 17시까지 올라온 최신 본을 기준으로 한다. 단, 이전 버전으로의 평가를 원할 시 따로 해당 사안을 전달할 수 있다.
- 코드 평가 요소는
  - 주어진 기능들을 적절히 잘 만들었는가
  - react의 기능들을 적절하게 잘 사용했는가
  - web request를 잘 모듈화하고, 해당 기능에 대한 ux 및 에러핸들링을 적절히 하였는가
  - 설치한 라이브러리를 잘 이해하고 적절히 사용했는가
  - lint, 변수명을 잘 썻는가. 기능별로 파일을 잘 분리하였는가
를 주로 하여 평가한다. (중요도 순 정렬.)


### 점수

- 제품에 대한 평가 (25) + 발표 평가(25) + 코드 평가 (50) 의 합산으로 이루어진다.
- 코드 평가는 개인별 작업량 및 난이도에 따라 같은 조여도 상이할 수 있다.
