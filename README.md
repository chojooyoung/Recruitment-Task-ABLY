# 📌Recruitment-Task-ABLY
## 1. 프로젝트 실행 방법

해당 Repository에서 clone을 받아가시거나, 다운받으셔서 터미널에서 아래와 같이 입력합니다.
(npm이 설치 되어있어야 합니다!)

### 패키지 설치

```npm i```

package.json 에 포함된 의존성 패키지들이 일괄적으로 설치합니다.

### 프로젝트 빌드
```npm run build```

프로젝트를 빌드 합니다.

### 프로젝트 실행
```npm run serve```

프로젝트를 실행하여 로컬에서 동작하게 합니다.

### 테스트 실행
```npm run test:unit```

tests/unit 에 포함된 TC들이 일괄적으로 실행됩니다.
- vsCode를 이용하시는 경우, extension으로 "jest"를 사용하시는 것을 권장드립니다.

## 2. 주 사용 라이브러리와 사용 의도

### Jest(vue-test-util)
Test Code를 작성하며 TDD방법론(테스트주도방식)에 의거하여 개발을 하기 위해 사용하였습니다.
설정한 규직은 아래와 같습니다.
1. 실패하는 단위 테스트를 작성할 때까지 실제 코드를 작성하지 않는다.
2. 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성한다.
3. 현재 실패하는 테스트를 통과할 정도로만 실제 코드를 작성한다.

앞서 적은 TDD의 필요성에 대입해서 정리하자면, 요구사항을 테스트 코드로 옮겨 적은 다음에 애플리케이션 코드 작성을 시작하는 것입니다. 이 때 주의할 것은 테스트 코드로 옮길 요구사항들은 쉽게 테스트할 수 있도록 아주 작은 단위부터 차근차근 쌓아나가는 것입니다.

위의 3가지 원칙을 한 사이클(Cycle)로 잡으면서 테스트 코드와 애플리케이션 코드를 번갈아가다보면 긴장감을 유지하면서 상대적으로 더 높은 생산성을 유지할 수 있습니다.


## 3. 프로젝트 폴더 구조와 설계 의도

### ```src/api```

Repository Pattern 

![image](https://user-images.githubusercontent.com/66211721/159227511-507eecbf-fb15-4913-95c5-04b172818e8c.png)

API를 설계할 때도 뚜렷한 기준을 가지고 접근하지 않으면 향후 API 폴더가 “난잡”해질 수 있었습니다. API가 난잡해지지 않게 하기 위해서는 설계를 할 때 뚜렷한 기준을 가지는 것이 필요하다고 생각 했습니다.
따라서 respository pattern을 사용하여, 외부에 노출되는 api spec을 줄이고, 조금 더 편리하게 이용하고자 설계하였습니다.

ex) repositories폴더 안에 각 함수(get,post,patch 등)을 넣어두고, RepositoryFactory폴더에서 묶어, 사용할때에는 RepositoryFactory를 import해와서 사용하였습니다.

api/repositories/Login.js
```js
import Client from "../AxiosClient";

const resource = "/api/login";

export default {
  requestLogin(userData) {
    return Client.post(`${resource}`, userData);
  },
};
```

api/RepositoryFactory.js
```js
import LoginRepository from "./repositories/Login";

const repositories = {
  login: LoginRepository,
};
export default {
  get: (name) => repositories[name],
};
```
사용할때
```js
import RepositoryFactory from "@/api/RepositoryFactory";
const loginRepository = RepositoryFactory.get("login");
const response = await loginRepository.requestLogin(userData);
```

interceptor

또한 api 사용을 위해 axios를 이용할때, interceptor를 사용하여 보다 더 유연하게 repositroy pattern(design pattern)을 사용하는데 의의를 더했습니다.

(ex. api에서 $axios를 가져와 새로운 axiosInstance를 만들어 domain(repository)마다 셋팅이 가능하다는 것)

이 채용 과제에서 실제사용은 **로그인 인증을 위해 헤더에 token을 붙히고, 응답 실패할시 해당status와 message를 받아오게 할때 사용하였습니다.** 

### ```src/asset```
필요한 이미지 파일, svg파일을 담아두는 공간입니다.

### ```src/components```
컴포넌트들을 담아두는 공간입니다.

### ```src/data```
필요하다면 사용할 dummyData들을 담아두는 공간입니다.

### ```src/router```
vue-router사용에 필요한 폴더입니다.

**특이사항**

![image](https://user-images.githubusercontent.com/66211721/159240151-3ebf4b61-d684-4005-b8e9-9280ba25d4c2.png)


- 개별 컴포넌트에 대한 라우팅 정의를 따로 분리하였습니다. 이렇게 할 경우 router에 대한 테스트 코드를 실행할 때(real router 방식에 한해) 필요없는 route는 제외하고 테스트를 진행할 수 있고, 가독성또한 좋아집니다.

### ```src/store```
vuex-store 사용에 필요한 폴더입니다.

### ```src/utils```
각종 필요한 함수, 유틸적인 부분에 사용에 필요한 폴더입니다.
여기선 storage사용을위한 storage의 getItem,setItem,removeItem등이 구현되어있습니다.

### ```src/views```
정의한 path에 라우팅시, 렌더링 될 페이지가 들어있는 폴더입니다.

### ```root/tests\unit```
describe단위로 폴더를 만들어 TC를 위한 폴더입니다.


## 4. 컴포넌트 구조와 설계 의도
![image](https://user-images.githubusercontent.com/66211721/159238245-78304300-3738-4e79-a476-dbf42ada5c62.png)

각 페이지 단위로 필요한 페이지들을 views 폴더 안으로 나누었고, views는 말그대로 보여주기만 하는 역할로, 실제기능은 컴포넌트에서 하게끔 설계하였습니다.

### 비밀번호 변경 흐름 
각 페이지에 필요한 데이터들은 vuex를 사용하여 store로 넘겨주었고 비밀번호를 바꾸는 흐름에는 각단계별로 page정보들이 필요할 것 같아 props로 간단히 넘겨주어 페이지정보를 나타내도록 하였습니다.
store를 사용한 이유는, 전역적으로 데이터관리를 하기 위함입니다.

## 5. (상태 관리를 사용한 경우) 상태 관리의 구조와 설계 의도
vuex를 사용하여 전역적으로 관리하였습니다. 하나씩 살펴 보겠습니다.

### 🔑 login.js
로그인 처리를위해, 로그인 성공시 응답이 오는 token을 authToken이라는 state에 저장하여, 전역적으로 확인하기 위하여 vuex를 사용하였습니다. 
특히 내 정보조회를 위해서 요청을 할 때, header에 token이 있어야하는 요청이 있을때, vuex를 사용하여 간단히 인증여부를 확인 할 수 있게 됩니다.
로그아웃시에는 이를 해제시켜줍니다.

#### state
```authToken``` (로그인 인증을 위한 상태로, header에 부착하여 로그인 유/무를 확인합니다. 또한 새로고침시 유지를 위해 Session storage를 활용하여 한번 거처서 값을 불러옵니다.)

#### getters
```getAuthToken``` (현재 토큰값을 return하는 함수입니다.

```isLogin``` (현재 state에 토큰값이 있냐 없냐를 리턴하는 함수입니다. interceptor에서 쓰이며, 이 함수로 로그인 유무를 판단합니다.)

#### mutations
```setAuthToken``` (인증토큰을 state에 집어넣습니다.)

```clearAuthToken``` (인증토큰을 storage와 state에서 제거합니다.)

#### actions
```initSetAuthToken``` 
```initClearAuthToken```
(각 mutations들을 실행을 요청합니다.)

### 🔧 ResetPassword.js
이메일인증 -> 인증번호입력 -> 비밀번호변경의 흐름을 갖게 됩니다. 각 프로세스에는 이전 컴포넌트에서 받은 데이터가 필요한 요청들이 있습니다.
물론 이처럼 작은 기능구현 요구사항에서는 props를 이용하여, 간단하게 데이터들을 넘겨주면 되겠지만 추후 규모가 확장될 경우 데이터와 처리할 코드가 늘어나 관리 포인트가 증가하게 되어 유지보수성이 떨어지게 될 수 있습니다.
따라서 vuex를 이용하여 전역적으로 데이터를 넘겨주고, 컴포넌트에서 할 일들을 vuex에 맡겨 실행하게 됩니다.

#### state
```userEmail``` (비밀번호 변경시 유저가 입력한 이메일을 저장합니다.)

```issueToken``` (이메일 입력시 응답으로 오는 issueToken을 저장합니다.)

```expireTime``` (이메일 입력시 응답으로 오는 만료시간을 저장합니다.)

```confirmToken``` (인증번호 입력시 응답으로오는 confirmToken을 저장합니다.)

#### getters

```getUserEmail``` 
```getIssueToken``` 
```getIssueToken``` 
```getIssueToken``` (userEmail,issueToken,expireTime,confirmToken 각각의 데이터를 가지고오는 getters입니다.)

#### mutations
```setUserEmail``` (email을 state에 넣습니다.)

```clearUserEmail``` (email을 storage와 state에서 제거합니다.)

(issueToken,expireTime,confirmToken 도 마찬가지로, email과 같습니다.)

#### actions
```initSetUserEmail``` 
```initClearUserEmail```
(각 mutations들을 실행을 요청합니다.)
(issueToken,expireTime,confirmToken 도 마찬가지로, email과 같습니다.)

## 6. (테스트를 작성한 경우) 테스트 시나리오 작성 의도와 목적

앞서 적은 TDD의 필요성에 대입해서 다시한번 정리하자면, 요구사항을 테스트 코드로 옮겨 적은 다음에 애플리케이션 코드 작성을 시작하는 것입니다. 
이러한 규칙을 정해 한 사이클(Cycle)로 잡으면서 테스트 코드와 애플리케이션 코드를 번갈아가다보면 긴장감을 유지하면서 상대적으로 더 높은 생산성을 유지할 수 있습니다.
이렇듯 개발 프로세스를 TestCode작성 -> 그에 맞춰 개발진행 흐름대로 진행하려고 최대한 노력하였습니다. 
시나리오를 작성할때, input 과 output으로만 test를 하도록 노력하였고(후 코드의 재사용성을 고려하여 짤 수 있도록 
컴포넌트 내부의 값은 건드리지 않고, mocking함수들과 setData를 이용하여 데이터를 정의후 testing) mount함수를 이용하여 mounted되었을때, 해당 element에 접근하여 output을 검증하였습니다.
하나씩 살펴보겠습니다.

### ```Home.spec.js```
시작 초기화면에서 로그인페이지로 이동하게 되는데, routing검증이 필요합니다. router-link를 사용하여 routing함으로, 이를 test하기 위해서는 router를 mocking하여 검증하지 않고,
real router방식으로 실제 router를 TC내에 구현하여, 이를 testing 하였습니다. 이때 필요한 로그인 router만 import해와서, click이벤트를 걸어 최상위 컴포넌트인 App에서 ```/login```으로 routing이 일어났는지에 대해 검증하였습니다.
- 라우팅이 잘 이루어 지는가?

### ```Login/login.spec.js```
두개의 인풋이 잘 값이 전달이 되고, 렌더링이 되는지에 대한 검증이 필요하여, 각각의 인풋에 올바른 값을 줘서 testing을 진행하였습니다. 또한 alert이 일어나는지에 대한 검증을 하기 위해
spyOn함수를 심어주어 로그인 버튼 클릭시 alert이 일어나는지에 대해 검증하였고, 올바르게 로그인을 하였을때, 정상적인 response에는 status code가 200이고, 이때 동작이 일어남으로 이 api함수를 mocking해와,mockResolvedValue함수를 이용하여 response값을 줍니다.

또한 this.$router 를 사용하여 routing하기 때문에, mocking 라우터를 사용하여 routing이 잘 동작이 되는지에 대하여 검증하였습니다.
- 로그인 컴포넌트가 렌더링이 잘 되었는가?
- 로그인버튼 클릭시 로그인 알림처리가 잘 되는가?(올바른 정보입력/아닌입력)
- mocking한 api repository함수가 호출되는가?
- mocking한 api repository함수로 alert이 동작하는가
- mocking한 router함수로 라우팅이 잘 동작하는가?

### ```UserInfo/userInfo.spec.js```
사용자 정보 페이지는, created훅을 이용하여 create될시, store에 정의된 token을 가지고 데이터를 받아와서 화면에 나타내주는 컴포넌트입니다.
처음에는 setData를 통해 data인스턴스에 값을 줘서, 해당 내용이 잘 렌더링이 되는지에 대한 테스팅을 먼저하고, 실제 컴포넌트에선 요청한데이터를 뿌려주기 때문에, 해당 요청함수가 필요합니다.
따라서 데이터를 받아올 함수를 mocking하여, response값을 실제데이터처럼 줘서 검증을 하였습니다.

login과 마찬가지로, routing 검사는 mocking Router 방식으로 진행하였습니다.
- 유저정보 컴포넌트가 렌더링이 잘 되었는가?
- 유저 정보 관련 태그들이 데이터를 잘 나타내는가?
- 로그아웃버튼 클릭시 알림처리가 잘 되는가?
- mocking한 api repository함수가 호출되는가
- mocking한 api repository함수로 렌더링이 잘이루어지는가
- mocking한 router함수로 로그아웃 라우팅이 잘 동작하는가?

### ```ResetPw/checkEmail.spec.js```
인풋폼에 유저 이메일을 받아, store에 저장하고 이를 바탕으로 요청처리 및 결과처리(다음페이지로 라우팅)를 하는 컴포넌트입니다. 인풋데이터에 대한 검증, 라우팅에 대한 검증이 필요합니다.
plugin으로 import 해온 store를 연결하고, 로그인과 크게 다르지 않게 검증하였습니다.
- 비밀번호 초기화 컴포넌트가 렌더링이 잘 되었는가?
- 다음버튼 클릭시 인증성공 여부와 관계없이 알림처리가 잘 되는가
- mocking한 api repository함수가 호출되는가?
- mocking한 api repository함수로 alert이 동작하는가?
- mocking한 router함수로 라우팅이 잘 동작하는가?

### ```ResetPw/checkAuthCode.spec.js```
인풋폼에 인증번호를 받아 요청처리 및 결과처리를 하는 컴포넌트입니다. 앞서 email과 똑같은 방식으로 TC를 짰습니다.

### ```ResetPw/resetPw.spec.js```
인풋폼 두개로 비밀번호를 검증하는 컴포넌트입니다. 로그인과 같은 방식으로 TC를 짰습니다.

## 7. 리뷰어에게 강조하고 싶은 부분 또는 그 외 기타 내용

### ✅ 사소하지만 추가적 기능
- [x] 모든 마크업은 스스로 하였고, scss를 사용하였습니다. 나름의 반응형으로 구현하였습니다.(사용자 정보 페이지)
- [x] 요구사항에 input을 사용할 일이 많아 input에 require를 주어, 입력하지 않는 다면 넘어가지 않게 하였습니다.

![image](https://user-images.githubusercontent.com/66211721/159255162-51f814a2-3271-4c00-aab5-c181ae98a22e.png)

- [x] maxLength를 사용하여 input값 길이에서 나올 수 있는 오류를 사전에 방지하고, ux적으로 좋게 유도하였습니다.
- [x] router/userInfo.js 안에 navigationGuard를 사용하여 인증되지 않은 사용자가 임의로 url을 임의로 조작하여 내정보 페이지로 이동하는 것을 방지 하였습니다.
```js
    beforeEnter(to, from, next) {
      // 인증이 필요한 페이지이고(and), store를 불러와 로그인 상태가 아니라면
      if (to.meta.auth && !store.getters["Login/isLogin"]) {
        // next 키워드로 로그인 상태페이지로 보내버린다.
        // eslint-disable-next-line no-alert
        alert("인증이 필요한 페이지 입니다.");
        next("/login");
        return;
      }
      // 로그인을 한 상태면 그대로 페이지로 접근시킨다.
      next();
    },
```

### ✅ 아쉬운점
- [x] 타입스크립트를 사용하지 못하였습니다. 타입스크립트를 사용해본 경험이 없어 3일이내로 셋팅부터 구현까지 도전하기란 무리가 있다고 판단하여, 자신있는 언어인 Js로 일단 작성하여 제출하였습니다.. 제약사항을 못지켜 너무 아쉽고 꼭 공부를 시작해야하는 계기가 된 것 같습니다.
- [x] SessionStorage를 store와 연계 사용하여, 새로고침시 토큰을 유지하도록 하였습니다. SessionStorage를 사용한 이유는, 개인정보 데이터기 때문에 무한정 저장되는 것이 아닌, 세션이 닫히면 자동으로 삭제되게끔 하는 것이 보안적으로 더 좋다는 나름의 근거를 갖고 사용하였습니다. 
- [x] 구현하면서 아쉬운점이 있었는데, 지금은 각 컴포넌트에서 api요청까지 진행을 하도록 구현하였습니다. 그러나 vuex을 적극적으로 사용하려면, api요청까지 vuex안의 actions로 구현이 되었더라면
더 좋고 유지보수성이 좋은 vuex활용이 될 수 있었을텐데, repository pattern으로 인터페이스를 만들면서, 해당 api요청 함수를 import해오는 과정중, cycle오류가 생겨(interceptor파일안에 로그인후 store를 import 해서 token을 header에 넣어주는 로직때문에 서로 import하는 상황이 발생) 
부득이하게 컴포넌트안에서 데이터를 받아왔습니다. 이 점이 너무 아쉽습니다. 인터페이스 설계시, 조금 더 깊이 생각하여 설계하는 것이 중요하다고 생각했습니다. 
- [x] 인증번호 검증페이지의 TC를 작성하여 그에맞게 로직을 짜보았으나, jest의 알수없는 오류 쓰지도 않은 'hasOwnProperty'함수가 가 undefined하다는 오류가 나와 결국 TC를 지우고, 개발만 하였습니다. 다른페이지와의 차이점이라면 setInterval을 사용한 페이지인 것 같은데, 앞으로 사용할때마다 대처가 되지 않는다면 치명적일 수 있다 판단하여, 원인을 찾아보고 싶습니다.
- [x] ui를 제대로 못챙긴 것 같습니다. 프론트엔드 개발자라면 그래도 디자인을 신경써야 하는데, 제가 부족한 탓에 디자인을 많이 신경쓰지 못하였습니다.

### 과제를 마치며..
채용프로세스중 과제전형은 처음 겪어보는 진귀한 경험이었습니다. 물론 제가 신입이다 보니 여러기업의 채용프로세스를 겪은 것은 아니지만, 데드라인 내에 개발을 한다는 압박이 되려 진짜 개발자가 된 느낌을 받았고, 저의 여러가지를 코드에 녹아내리면서 PR할수있는 기회이자 동시에 기업에서는 제 문제점들을 한번에 확인 할 수 있는 좋은 프로세스 중 하나라고 느꼈습니다.
과제내용을 보고, 간단하다고 생각하였으나 실제로는 여러가지 난관에 부딪히며 자만 했던 제 마음을 다시금 바로잡을 수 있었습니다. 이를 발판으로 더욱 성장하는 계기로 삼아 멈추지 않겠다는 의지를 다졌습니다.
부족한 저에게 여러가지 깨달음과 이런 소중한 기회를 주시어 감사의 인사를 드리면서, 작성을 마무리 하고자 합니다. 긴 글 읽어주셔서 감사합니다.
