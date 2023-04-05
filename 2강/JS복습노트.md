# JS 복습

---
## var let const
Var -> function scope 
Const, let -> block scope (호이스팅 같은 문제 해결)
블록 안에서 선언 되면 블록 밖에서는 변수에 접근 불가

---

## 템플릿문자열
```
const num3 = 1;
const num4 = 2;
const result2 = 3;
const string2 = `${num3} 더하기 ${num4}는 ' ${result2}'`;
```

---

## 객체 리터럴 (객체에 동적으로 속성 추가)
```
var sayNode = function() {
  console.log('Node');
};
var es = 'ES';
var oldObject = {
  sayJS: function() {
    console.log('JS');
  },
  sayNode: sayNode,  객체 안에 다른 객체 삽입 가능.
};
oldObject[es + 6] = 'Fantastic';  oldObject의 key=ES6, value=’Fantastic’
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const newObject = {
  sayJS() { // 콜론, function() 안붙혀도 됨.
    console.log('JS'); 
  },
  sayNode, // sayNode : sayNode처럼 속성명과 변수명이 동일한 경우 하나만 써도 됨.
  [es + 6]: 'Fantastic', // ES6라는 속성명을 만들려면 객체 리터럴(oldObject) 바깥에서 [es+6]를 해야 했습니다. 하지만 ES2015 문법에서는 객체 리터럴 안에 동적 속성을 선언해도 됩니다. newObject 안에서 [es + 6]가 속성명으로 바로 사용되고 있습니다.
};
newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic
```
---

* 화살표 함수
```
Function add(x,y) {
Return x + y;
} 

Const add2 = (x, y) => x + y;
```

-> This binding 예시
```
var relationship1 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function () {
    var that = this; // relationship1을 가리키는 this를 that에 저장
    this.friends.forEach(function (friend) {
      console.log(that.name, friend);
    });
  },
};
relationship1.logFriends();

const relationship2 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends() {
    this.friends.forEach(friend => {
      console.log(this.name, friend);
    });
  },
};
relationship2.logFriends();
```

화살표 함수를 사용하면 바깥 스코프인 logFriends()의 this를 그대로 사용할 수 있습니다. 상위 스코프의 this를 그대로 물려받는 것입니다.

## 구조분해할당
객체나 배열로부터 속성이나 요소를 꺼낼 수 있다. 하지만 함수의 this가 달라질 수 있으므로 bind 함수를 따로 사용해야 함.
```
const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};
const { getCandy, status: { count } } = candyMachine;
```
## 배열에 대한 구조 분해 할당 문법.
```
const array = [‘nodejs’, {}, 10, true];
const [node, obj, , bool] = array;

node = ‘nodejs’
obj = {}
bool = true; // 로 선언한 것과 마찬가지
```

## 클래스
JS에서는 클래스 기반으로 동작하는 것이 아닌 프로토타입 기반으로 동작함.
```
class Human {
  constructor(type = 'human') { // 입력 없으면 type = ‘human’ 할당
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    alert('h-a-a-a-m');
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero); // true
```

## Promise

JS는 주로 비동기를 접함. 특히 이벤트 리스너를 사용할 때 콜백 함수를 자주 사용
But ES2015부터 프로미스 기반으로 재구성

프로미스를 쉽게 설명하자면, 실행은 바로 하되 결괏값은 나중에 받는 객체
결괏값은 실행이 완료된 후 then이나 catch 메서드를 통해 받습니다. 위 예제에서는 new Promise와 promise.then 사이에 다른 코드가 들어갈 수도 있습니다. new Promise는 바로 실행되지만, 결괏값은 then을 붙였을 때 받게 됩니다.
```
const condition = true; // true이면 resolve, false이면 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});
// 다른 코드가 들어갈 수 있음
promise
  .then((message) => {
    console.log(message); // 성공(resolve)한 경우 실행
  })
  .catch((error) => {
    console.error(error); // 실패(reject)한 경우 실행
  })
  .finally(() => { // 끝나고 무조건 실행
    console.log('무조건');
});
```

Promise 내부에서 resolve 호출 시 then 실행, reject 호출 시 catch 실행 

Resolve(‘성공’)이 호출 되면 -> then의 파라미터가 ‘성공’ 이 됨. 
Reject(‘실패’)가 호출되면 -> catch의 파라미터가 ‘실패’가 됨. 

then이나 catch에서 다시 다른 then이나 catch를 붙일 수 있습니다. 이전 then의 return 값을 다음 then의 매개변수로 넘깁니다. 프로미스를 return한 경우 프로미스가 수행된 후 다음 then이나 catch가 호출됩니다.

```
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  })

  .catch((error) => {
    console.error(error);
});
```

* Promise.resolve() : 즉시 resolve하는 프로미스를 만드는 방법
프로미스가 여러 개 있을 때 Promise.all에 넣으면 모두 resolve될 때까지 기다렸다가 then으로 넘어갑니다. Promise 중 하나라도 reject가 되면 catch로 넘어갑니다. 다만, 여러 프로미스 중 어떤 프로미스가 reject되었는지는 알 수 없습니다. Promise.all을 사용할 때에는, 등록한 프로미스 중 하나라도 실패하면, 모든 게 실패한 것으로 간주합니다.

```
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result); // ['성공1', '성공2'];
  })
  .catch((error) => {
    console.error(error);
  });
```

* 정확히 어떤 프로미스에서 reject되었는지 알기 위해서는 Promise.all 대신 Promise.allSettled를 사용해야 합니다.

```
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.reject('실패2');
const promise3 = Promise.resolve('성공3');
Promise.allSettled([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
/* [
*    { status: 'fulfilled', value: '성공1' },
*    { status: 'rejected', reason: '실패2' },
*    { status: 'fulfilled', value: '성공3' }
*  ]
*/
  })
  .catch((error) => {
    console.error(error);
  });
```

Promise.allSettled를 사용하면 결괏값이 좀 더 자세해져서 어떤 프로미스가 reject되었는지 status를 통해 알 수 있습니다. 실패 이유는 reason에 들어 있습니다. 따라서 Promise.all 대신 Promise.allSettled를 사용하는 것을 좀 더 권장합니다. reject된 Promise에 catch를 달지 않으면 UnhandledPromiseRejection 에러가 발생합니다. 에러가 발생하면 다음 코드가 실행되지 않으니 반드시 프로미스에 catch 메서드를 붙이는 것을 권장합니다.
```
try {
  Promise.reject('에러');
} catch (e) {
  console.error(e); // UnhandledPromiseRejection: This error originated either by throwing inside...
}

Promise.reject('에러').catch(() => {
  // catch 메서드를 붙이면 에러가 발생하지 않음
})
```

## async/await

예제 코드) Users -> promise 적용
```
function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'zero';
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: 'm' });
    })
    .then((user) => {
      // 생략
    })
    .catch(err => {
      console.error(err);
    });
}
```

Async/await 을 사용하면 다음과 같이 짧게 줄일 수 있다.

```
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // 생략
  } catch (error) {
    console.error(error);
  }
}
```
함수 선언부를 일반 함수 대신 async function으로 교체한 후, 프로미스 앞에 await을 붙였습니다. 이제 함수는 해당 프로미스가 resolve될 때까지 기다린 뒤 다음 로직으로 넘어갑니다. 예를 들면, await Users.findOne({})이 resolve될 때까지 기다린 다음에 user 변수를 초기화하는 것입니다. 
For 문과 async/await을 같이 써서 promise를 순차적으로 실행할 수 있음. For문과 함께 쓰는 것은 노드 10 버전부터 지원하는 ES2018 문법.
```
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
})();
```
## Map / Set
Map은 객체와 유사 / Set은 배열과 유사
```
const m = new Map();

m.set('a', 'b'); // set(키, 값)으로 Map에 속성 추가
m.set(3, 'c'); // 문자열이 아닌 값을 키로 사용 가능합니다
const d = {};
m.set(d, 'e'); // 객체도 됩니다

m.get(d); // get(키)로 속성값 조회
console.log(m.get(d)); // e

m.size; // size로 속성 개수 조회
console.log(m.size) // 3

for (const [k, v] of m) { // 반복문에 바로 넣어 사용 가능합니다
  console.log(k, v); // 'a', 'b', 3, 'c', {}, 'e'
} // 속성 간의 순서도 보장됩니다

m.forEach((v, k) => { // forEach도 사용 가능합니다
  console.log(k, v); // 결과는 위와 동일
});

m.has(d); // has(키)로 속성 존재 여부를 확인합니다
console.log(m.has(d)); // true

m.delete(d); // delete(키)로 속성을 삭제합니다
m.clear(); // clear()로 전부 제거합니다
console.log(m.size); // 0
```

Map은 속성들 간의 순서 보장, 반복문 사용 가능
속성명으로 문자열이 아닌 값 사용 가능, size 메서드로 속성 수 알 수 있음.

```
const s = new Set();
s.add(false); // add(요소)로 Set에 추가합니다
s.add(1);
s.add('1');
s.add(1); // 중복이므로 무시됩니다
s.add(2);

console.log(s.size); // 중복이 제거되어 4

s.has(1); // has(요소)로 요소 존재 여부를 확인합니다
console.log(s.has(1)); // true

for (const a of s) {
  console.log(a); // false 1 '1' 2
}

s.forEach((a) => {
  console.log(a); // false 1 '1' 2
})

s.delete(2); // delete(요소)로 요소를 제거합니다
s.clear(); // clear()로 전부 제거합니다
```
* set은 집합과 같은 느낌 (중복 제거의 배열)
기존의 배열도 중복을 제거할 수 있음.
```
const arr = [1, 3, 2, 7, 2, 6, 3, 5];

const s = new Set(arr);
const result = Array.from(s); 배열로 되돌리기
console.log(result); // 1, 3, 2, 7, , 5
```
## 널 병합/옵셔널 체이닝

ES2020에 추가된 ?? 연산자 (널 병합) / ?. 연산자

널 병합 연산자는 || 연산자 대용으로 사용되며, falsy 값(0, '', false, NaN, null, undefined) 중 null과 undefined만 따로 구분합니다. Falsy 값이면 뒤의 값을 호출, 아니면 앞의 값을 호출

Ex>
```
Const a = 0
Const b = a || 3   //  (falsy 값이면 뒤에 거 할당) 3

Const c = 0
Const d = c ?? 3   // (null undefined일 때만 뒤에 거 할당) 0
```

* 옵셔널 체이닝 연산자는 null이나 undefined의 속성을 조회하는 경우 에러가 발생하는 것을 막는다.
```
const c = null;
try {
  c.d;
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'd')
}
c?.d; // 문제없음

try {
  c.f();
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'f')
}
c?.f(); // 문제없음 (undefined 결괏값)

try {
  c[0];
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading '0')
}
c?.[0]; // 문제없음 (undefined 결과)

```
