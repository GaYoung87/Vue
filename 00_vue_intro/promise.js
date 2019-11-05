// 외부에 요청을 보내서 그 결과를 출력하는 코드를 작성하고자 한다.
// 1. 몇초 뒤에 데이터가 응답되면
// 2. 데이터를 변수에 저장하여 출력!


// =========================================================================================================
// // 비동기적으로 작동하는 js에서 해결책
// function getData() {  // 데이터를 반환받고자하는 함수
//   let data
  
//   setTimeout(() => {
//     // 데이터를 할당시킬 수 없는데 자꾸 return 하고 있어서 getData => undefined 찾음
//     // data 가지고오기전에 '요청을 보냈다'고 출력!
//     console.log('요청을 보냈습니다!')  // 데이터 가지고오려니까 시간이 오래걸림. 비동기적으로 작동, js에서 응답오
//     data = {'data': 'somedata'}
//   }, 100);
//     // 
//   return data
// }

// function printData() {
//   let response1 = getData()
//   console.log(response1)
// }

// printData()



// =========================================================================================================
// [Call back]
// function getDataCallback(callback) {  // 2. callback으로 함수가 넘어옴. 즉, callback = 저 익명함수
//   setTimeout(() => {
//     console.log('INFO: 요청을 보냈습니다.')
//     const data = {'data': 'somedata'}
//     // 인자로 함수를 받아, 데이터 받은 순간에 callback함수 작동시키겠다.
//     callback(data)  // 3. 다 끝나고 저 함수를 실행
//   }, 100);
// }

// // 1. 출력하는 작업하는 함수를 인수로 넘김
// // getDataCallback(callback함수) -> 계속 깊어짐
// getDataCallback(function(data) {
//   console.log(data)
//   console.log(1)
//   getDataCallback(function(data2) {
//     if (data2 === data) {
//       getDataCallback(function(login) {

//       })
//     }
//   })
//         // INFO: 요청을 보냈습니다.
//         // { data: 'somedata' }
// })




// =========================================================================================================
// //  ew Promise(resolve => {  // 반환부터 하고 시작!  // 함수 작성 시작
    
    setTimeout(() => {
      if (true) {
        console.log('INFO: 요청을 보냈습니다.')
        const data = {'data': 'somedata'}
        resolve(data)  // .then으로 꺼낼 수 있는 객체가 된다.
      } else {
        reject('조건에 통과하지 못했어요!')
      }
    }, 100)


console.log(getDataPromise())
  // Promise { <pending> }
  // INFO: 요청을 보냈습니다.

// 2. 어떤다짐? -> 데이터를 요청한 뒤 어떻게 할꺼야!  // Promise 안쪽의 함수에 표현한다.
getDataPromise()
  .then(response => {  // data = resolve(data)
    console.log(1)
    return response.data
  })
  .then((data) => {
    console.log(data)
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .catch(error => {  // catch는 하나만 있어도 괜찮
    console.error(error)
  })




// =========================================================================================================
// 비동기적으로 실행하는데, 가끔은 동기적으로 작동하는 것이 필요.
// 내가 데이터 요청했을 때 응답받을 때까지 기다렸다가 데이터 가지고오면 내가 그 데이터 가지고 console.log할께!
// => 함수 안에서 작성 

const handleData = async function() {
  const response = await getDataPromise()  // data값 {'data': 'somedata'}를 가지고 있음
  // await: 기다리겠다.
  // 우리는 getDataPromise()를 통해 데이터 받는거 알겠지만,
  // 그냥 받겠다.
  console.log(response)
}

handleData()
