# Vue

- javascript기반의 frontend프레임워크

- JS에서 DOM 사용 -> html에 삽입, 테그 안 속성 수정, 삭제, 추가 등 동적으로 변경

- SPA = Single Page Application 중 하나

- 기존의 django에서 bootstrap, 좋아요 누르면 detail페이지를 다시한번 load해야함

  불필요한 단계가 존재

- **SPA**  : update되는 내용만 보내줌. 페이지를 전체적으로 보내주는 것이 아니라, 

  ​		   좋아요누른 것, 몇명이 좋아요를 눌렀는지에 대한 정보만 보내줌

  ​	    => 새롭게 요소를 생성해서 보내줌 -> 내가 필요한 부분만 수정 => 불필요한 작업 하지 않음

- ![image-20191104104815409](C:\Users\student\AppData\Roaming\Typora\typora-user-images\image-20191104104815409.png)

   - view 가 가지고 있는 데이터를 수정해 view 에서 보여줌 : binding

   - ViewModel = 내가 알고있는 view, View = html

   - view한테 articles item이 있고, viewModel에 articles list로 binding(묶어둠) -> Model한테서 article data를 불러와서 viewModel을 바꾸면 view가 알아서 바뀐다

   - 반응형!! (console 창에서 수정하면 바로 바뀜)

     ![image-20191104111851441](C:\Users\student\AppData\Roaming\Typora\typora-user-images\image-20191104111851441.png)

   - Vue.js devtools : 크롬에 추가

   -  공식문서 참조: https://kr.vuejs.org/v2/guide/index.html 
