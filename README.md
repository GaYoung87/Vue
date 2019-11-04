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



### 00_view_start

-   ![image-20191104113004442](C:\Users\student\AppData\Roaming\Typora\typora-user-images\image-20191104113004442.png)

```html
<body>
  <div>
    {{ message }}
    <div id="app">
      {{ message }}
    </div>
  </div>
  <script>
  // Vue 코드 작성되는 곳
  const app = new Vue({
    // class="app": .app, id="app": #app
    el: '#app',  // CSS Selector
    data: {
      message: 'Hello, Vue!'
    }
  })
  
  </script>
  
</body>
```

- 함수

![image-20191104114219315](C:\Users\student\AppData\Roaming\Typora\typora-user-images\image-20191104114219315.png)

```html
<body>
  <div>
    <!-- {{ message }} -->
    <div id="app">
      {{ message }} - {{ count }}
    </div>
  </div>
  <script>
  // Vue 코드 작성되는 곳
  const app = new Vue({
    // class="app": .app, id="app": #app
    el: '#app',  // CSS Selector
    data: {
      message: 'Hello, Vue!',  // 모든 type이 들어갈 수 있음
    count: 0,
    },
    // vue instance 내에서는 this.message로 접근 가능
    methods: {
      plus: function() {  // vue에서는 arrow function 사용 불가, vue에게 정의할 때는 function사용 불가
        this.count++  // function키워드가 있어서 this가 vue함수를 가리킬 수 있다.
        // function키워드로 함수정의를 해야 this가 vue 인스턴스를 가리킨다.
      },
      minus: function() {
        this.count--
      }
    }
  })

  // // Console창에서 값 바꾸기
  // app.message = 'adsf'  // shortcut
  // app.$data.message = 'adsf'
  
  </script>
```



### 01_vue_todo_app.html

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- vue 사용할 준비 완료 -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <title>Todo App</title>
  <style>
    .completed {
      text-decoration: line-through;
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <div id="app">
    <h1 v-bind:style="{ color: activeColor, fontSize + 'px' }">Todo APP</h1>
    <ul>
      <!-- <li v-for="todo in todos" v-if='!todo.completed' v-on:click='toggleTodo(todo)'>
        {{ todo.content }}
      </li>
      <li v-else @click='toggleTodo(todo)'>[완료!]</li> -->

      <!-- 체크박스 만들기 위 li 와 동일 -->
      <li v-for="todo in todos" v-bind:class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed">
        {{ todo.content }}
      </li>
    </ul>
    <!-- v-model넣어주면 실시간으로 연동 -->
    <input v-model="newTodo" type="text" v-on:keydown.enter="addTodo">
    
    <footer>
      <button v-on:click="clearCompleted">Clear Completed</button>
    </footer>

  </div>

  <script>
    const app = new Vue({
      el: '#app',
      data: {
        todos: [
          {
            content: '저녁 메뉴 고민하기',
            completed: true,
          },
          {
            content: '사다리 타기',
            completed: false,
          },
          {
            content: '약속의 2시 낮잠자기',
            completed: false,
          },
          {
            content: '야자하기',
            completed: false,
          },         
        ],
        newTodo: '',
        // 수정할 때 편함 -> activeColor, fontSize 변수로 작성하면 변수 값만 수정하면 편함 
        activeColor: 'orange',
        fontSize: 30,
      },
      methods: {
        toggleTodo: function(todo){
          todo.completed = !todo.completed
        },
        addTodo: function() {
          this.todos.push({
            content: this.newTodo,
            completed: false
          })
          this.newTodo = ''
        },
        // filter 이용
        clearCompleted: function() {
          // Completed가 true인 모든 todo를 리스트에서 삭제한다.
          // => Completed가 false인 todo만 남는다

          // this -> Vue함수의 특정한 데이터에 접근을 하겠다
          this.todos = this.todos.filter(todo => {
            return !todo.completed
        })

        // // for문 사용
        // clearCompleted: function() {
        //   const newTodos = []

        //   for (const todo of this.todos) {
        //     if (!todo.completed) newTodos.push(todo)
        //   }
        //   this.todos = newTodos
        }
      },
    })
    // todo.pop() 하면 하나씩 없어짐
  
  
  </script>
  
</body>
</html>
```



### 02_dogs_and_cats.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- Axios -->
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <!-- vue 사용할 준비 완료 -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <title>Document</title>
</head>
<body>
  <div id="app">
    <button v-on:click="getDogImage">멍멍</button>
    <img :src="dogImage" alt="멍멍">

    <button v-on:click="getCatImage">야옹</button>
    <img v-bind:src="catImage" alt="야옹">
    <!-- <img :src="catImage" alt="야옹"> 이것과 동일 -->
  </div>

  <script>
    // 1. Vue instance에 함수를 ""정의할 때""는 function 키워드를 사용
    //    -> 그렇게 해야 정의된 함수의 this가 vue instance를 가리킨다.

    // 2. Vue instance에 정의된 함수 내에서 ""callback 함수를 사용할 때"" arrow function을 사용한다.
    //    -> 그렇게 해야 callback 함수의 this가 vue instance를 가리킨다.

    const app = new Vue({
      el: '#app',
      data: {
        dogImage: '',
        catImage: '',
      },
      methods: {
        getDogImage: function() {
          const API_URL = 'https://dog.ceo/api/breeds/image/random'
          // API URL로 요청을 보내 응답받은 강아지 사진 url을 Vue Instance의 dogImage를 data값에 할당한다

          // this <= vue instance
          axios.get(API_URL)
            // function이 아닌 arrow function으로 적어줘야함 
            .then((response) => {
              // 응답받은 이미지 url을 vue instance의 dogImage값에 할당!
              this.dogImage = response.data.message
            })
        },
        getCatImage: function() {
          // API URL로 요청을 보내 응답받은 고양이 사진 url을 Vue Instance의 catImage를 data값에 할당한다
          const API_URL = 'https://api.thecatapi.com/v1/images/search'

          axios.get(API_URL)
            .then((response) => {
              this.catImage = response.data["0"].url
            })
        }
      },

      // 처음에 load가 되면 한번씩 실행 시키고 시작하기! (처음부터 사진 보여주고 시작!)
      // 최초 vue instacne가 생성된 후 실행하는 함수
      created: function() {
        this.getDogImage()
        this.getCatImage()
      }
    })
  </script>
  
</body>
</html>
```



### counter - vanilajs   vs    vue

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Counter</title>
</head>
<body>
  <!-- Vue 사용 -->
  <button id="counter">0</button>
  
  <div id="app">
    <button @click="increase">add</button>
    <span>{{ count }}</span>
  </div>

  <script>
    const app = new Vue({
      el: '#app',
      data: {
        count: 0
      },
      methods: {
        increase: function() {
          this.count++
        }
      }
    })
  </script>

  <!-- vanilla js 사용-->
  <!-- <script>
    const counterBtn = document.querySelector('#counter')
    counterBtn.addEventListener('click', function(event) {
      const count = Number(counterBtn.innerText) + 1
      counterBtn.innerText = count
    })
  </script> -->
</body>
</html>
```

