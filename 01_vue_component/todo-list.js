Vue.component('todo-list', {
  template: `
  <div class="todo-list">
    <h2>{{ category }}</h2>
    <input type="text" v-model="newTodo">
    <button v-on:click="addTodo">+</button>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.id">
        <span>{{ todo.content }}</span>
        <button @click="removeTodo(todo.id)">x</button>
      </li>
    </ul>
  </div>
  `,
  // props: ['category'],  // props사용해서 데이터 전달하기
  props: {
    'category': {
      type: String,
      required: true,
      },  // 기본적으로 type은 명시를 하자!
    // 'propA': Number,  // 숫자 값만 허용(null은 어떤 타입이든 허용)
    // 'propB': [String, Number],  // String과 Number 타입만 허용
    // 'propC': {
    //   type: String,
    //   required: true,
    // },  // 문자열이면 반드시 필요하다
    // 'propD': {
    //   type: Number,
    //   default: 100,
    // },  // 숫자이며, 기본 값을 가진다
    // 'propE': {
    //   type: Object,
    //   default: function() {
    //     return { message: 'hello' }
    //   },
    // },  // 객체와 배열의 기본 값은 함수 반환형으로 작성한다.
    // 'propF': {
    //   validatior: function(value) {
    //     return value > 10
    //   }
    // }
  },
  // https://kr.vuejs.org/v2/guide/components.html#data-%EB%8A%94-%EB%B0%98%EB%93%9C%EC%8B%9C-%ED%95%A8%EC%88%98%EC%97%AC%EC%95%BC%ED%95%A9%EB%8B%88%EB%8B%A4
  // 요약: 일반 object로 작성하면 모든 component가 하나의 데이터를 공유할 수 있기 때문
  data: function () {
    return {
      todos: [],
      newTodo: '',
    }
  },
  methods: {
    addTodo: function() {
      // console.log(this)  // Vue
      if (this.newTodo) {
        this.todos.push({
          id: new Date().getTime(),
          content: this.newTodo,
        })
        this.newTodo = ''
      }
    },
    // TODO: todo 의 id 값을 인자로 받아 todos 에서부터 해당 id 값을 가진 todo 를 삭제한다.
    // target_id: 내가 지우고싶은 id값
    removeTodo: function(target_id) {
      
      // filter이용
      const newTodos = this.todos.filter(todo => {
        return todo.id !== target_id
      })
      this.todos = newTodos
    }
  },
})