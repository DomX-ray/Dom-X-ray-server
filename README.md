# DOMX-Ray
https://user-images.githubusercontent.com/95201149/207520427-9b3aad81-9bf3-4e14-a306-c2ada50c8371.mp4
- Vanilla Javascript로 만든 DOM Tree 시각화 웹사이트입니다.
- 원하는 웹사이트의 URL 만으로 DOM Tree의 계층 구조를 트리 형태로 확인할 수 있습니다.

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [고민하였던 부분](#고민하였던-부분)
  1. 어떤 기술을 사용할까? **Vanilla Javascript** vs React
  2. 어떻게 크롤링할까? Axios vs **Puppeteer**
  3. 어디서 Parsing할까? Client vs **Server** 에서 Parsing
- [어려움을 겪었던 부분](#어려움을-겪었던-부분)
  1. Vanilla Javascript 페이지 전환
  2. Webpack 설정
- [개선할 부분](#개선할-부분)
- [프로젝트 회고](#프로젝트-회고)

<br>

## **프로젝트 소개**

### **프로젝트 기간: 2022. 11.07 ~ 11. 27 (기획 1주, 개발 2주)**

- 1주차: 프로젝트 기획
  - 기술 검증, 아이디어 기획, Mockup 제작, 칸반 스케줄링
- 2주차: 기능 개발
- 3주차: 기능 개발 마무리 및 배포

### **기술 스택**
**Frontend** | **Backend** |
:-----: | :-----: |
Vanilla Javascript | Node.js |
D3 | Express |
Webpack | Puppeteer |
SCSS | |

<br>

## **고민하였던 부분**

### **어떤 기술을 사용할까?**

#### **Vanilla Javascript** vs React.js

처음엔 익숙하게 사용했던 React로 개발을 진행하려고 했습니다. 하지만 Mockup를 만들면서 관리해야 할 component와 state가 거의 없다고 느꼈습니다. 아주 간단한 구조의 웹서비스이다 보니, 이번 기회가 Vanilla Javascript만을 이용해 프로젝트를 할 수 있는 좋은 기회라고 생각해 **Vanilla Javascript**를 선택하게 됐습니다.

<br>

### **어떻게 크롤링할까?**

#### Axios vs **Puppeteer**

다른 웹사이트의 Dom Tree를 시각화하기 위해선 해당 웹사이트를 크롤링 해야 했습니다.

1. Axios를 이용한 GET(simple request) 요청을 하는 방법
2. Puppeteer로 크롤링 해서 다른 웹사이트의 HTML 파일을 가져오는 방법

위 두 가지 방법이 모두 가능하지만, 어떤 웹사이트를 크롤링 할 지 모르는 이 프로젝트의 특성상, SPA로 된 페이지도 크롤링 할 수 있는 Puppeteer를 사용하는 게 더 낫다고 판단했습니다.

<br>

### **어디서 Parsing할까?**

#### Client vs **Server** 에서 **Parsing**

1. Client에서 하는 경우, 서버에서 받은 html 파일(innerHtml)을 Dom parser를 이용해서 Dom 객체를 얻은 후 Parsing 하는 방법
2. Server에서 하는 경우, 크롤링 한 html 파일 Puppeteer 내 API를 이용해 데이터를 Parsing 하는 방법

두 가지 방법 중, Puppeteer에서 원하는 데이터를 추출하는 것이 익숙지 않아, Client에서 하는 방법이 저에겐 더 구현하기 쉬웠습니다. 하지만, 어떤 사이트를 Parsing 해야 할지 모르기 때문에 꽤 무거운 작업이 될 수 있고, Puppeteer로 크롤링 한 HTML 파일 전부를 Client로 응답하는 것보다 서버에서 데이터를 Parsing 한 후, 원하는 데이터만 골라 바로 사용할 수 있는 형태로 응답을 보내는 것이 더 낫다고 생각했습니다.

<br>

## **어려움을 겪었던 부분**

### Vanilla Javascript 페이지 전환

History API를 통해 Vanilla Javascript로 구현하기로 했습니다. 페이지가 많지 않고 고정되어 있는 UI 요소가 없는 서비스의 특성상, SSR로 보여주는 방식도 UX 면에서 자연스럽다고 판단했지만 Vanilla Javascript를 좀 더 응용해 보고 싶다는 마음에 이 방식을 채택했습니다.
React에서 route를 사용하는 것과 같이, 요소에 route 속성을 직접 부여해서 해당 route에 따라 다른 페이지가 보이도록 했습니다. 이 때, `history.pushState`로 페이지 이동 없이 주소만 바꿔주었고, 검색시 입력한 정보를 전해주었습니다. 유저가 뒤로가기 버튼을 누를 경우에 대비해서 `onpopstate` 이벤트를 이용해 페이지를 전환해줬습니다.

<br>

### Webpack 설정

지금까지 편하게 써 온 Boilerplate을 안 썼기 때문에, 처음으로 개발 환경 세팅을 해야했습니다. webpack을 직접 설정을 하면서 글로만 봤던 Bundling하는 과정을 깊게 이해할 수 있었습니다. 많은 옵션때문에 초기 세팅이 까다롭게 느껴지기도 했지만, 다행히 Webpack 공식문서에서 많은 도움을 받을 수 있었습니다.
특히 코드를 수정할 때 Webpack에서 에러가 많이 발생해서 어려움을 겪기도 했지만, 오히려 수정한 코드에 영향을 미치는 Webpack 설정을 알 수 있었습니다. 다음 프로젝트에서 다시 Boilerplate를 사용해 개발하더라도 기본으로 제공되는 설정을 수정해서 좀 더 원하는 방향으로 사용할 수 있다는 생각이 들었습니다.

<br>

## **개선할 부분**
- tag 정보
  - tag내 content를 다 보내기 보단, Frontend에서 유저에게 보여주는 만큼만 Parsing해서 response 간소화

<br>

## **프로젝트 회고**

첫 개인 프로젝트를 하면서 모든 의사결정을 혼자 다 해야 한다는 가장 어려웠던 점이었습니다. 팀 프로젝트를 할 땐, 고민이 되는 주제에 대해 토론하며 결정하는 과정 자체가 재밌었고, 논의하다 보면 전혀 생각지 못했던 포인트가 나오면서 해결할 때가 많았습니다. 하지만 개인 프로젝트 때는 많은 정보 속에서 제 결정의 근거를 찾고 확신을 갖기까지의 과정이 생각보다 조금 오래 걸렸고, 이점이 작업이 지연됐었던 원인 중 하나였습니다.

당장의 100% 확신을 갖기보다 완벽한 결정은 없기 때문에 당시의 최선책을 빠르게 시도해 보고, 예상과 다르다면 차선책으로 진행해야 한다는 것을 배웠습니다.

이번 프로젝트는 오히려 기본으로 돌아간 느낌이 많이 들었습니다. Vanilla Javascript로 Frontend를 개발하고, Webpack를 사용하는 등, 조금 더 편리하고 빠르게 개발할 수 있는 tool 대신, 기본으로 돌아가 작업하면서 오히려 tool이 작동하는 원리를 더 이해할 수 있었고, 다음에 tool을 더 응용할 수 있겠다는 생각이 들었습니다.
