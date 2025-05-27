// 📂 user-utils.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// 아래는 예시입니다. 자유롭게 콘솔로 확인해보세요.
var updateForm = {
    name: '강예은',
    email: 'kangyeeun55@gmail.com',
};
// 3. Record 유틸리티 타입 활용
// --------------------------------------
// User 타입을 id 기준으로 관리하는 userMap을 만들어보세요.
var userMap = {
    // TODO: 임의의 유저 두 명을 추가해보세요.
    1: { id: 1, name: 'Alice', email: 'alice@example.com', isAdmin: false },
    2: { id: 2, name: 'Bob', email: 'bob@example.com', isAdmin: true },
};
// 4. 제네릭 함수 만들기
// --------------------------------------
// 4-1. identity 함수
// 전달받은 값을 그대로 반환하는 제네릭 함수를 만들어보세요.
function identity(value) {
    // TODO
    return value;
}
// 4-2. getFirstItem 함수
// 배열의 첫 번째 요소를 반환하는 함수입니다.
function getFirstItem(arr) {
    // TODO
    return arr[0];
}
// 4-3. merge 함수
// 두 객체를 합쳐 하나의 객체로 반환합니다.
function merge(a, b) {
    // TODO
    return __assign(__assign({}, a), b);
}
// 5. 테스트 (출력 확인)
console.log(identity(123));
console.log(getFirstItem(['a', 'b', 'c']));
console.log(merge({ name: 'yeeun' }, { age: 24 }));
