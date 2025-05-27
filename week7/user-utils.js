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
var updateForm = {
    name: "수정된 이름",
    email: "updated@email.com",
};
// 3. Record 유틸리티 타입 활용
// --------------------------------------
var userMap = {
    1: { id: 1, name: "Alice", email: "alice@example.com", isAdmin: false },
    2: { id: 2, name: "Bob", email: "bob@example.com", isAdmin: true },
};
// 4. 제네릭 함수 만들기
// --------------------------------------
// 4-1. identity 함수
function identity(value) {
    return value;
}
// 4-2. getFirstItem 함수
function getFirstItem(arr) {
    return arr[0];
}
// 4-3. merge 함수
function merge(a, b) {
    return __assign(__assign({}, a), b);
}
// 5. 테스트 (출력 확인)
console.log(identity(123)); // 123
console.log(getFirstItem(["a", "b", "c"])); // "a"
console.log(merge({ name: "jaemin" }, { age: 26 })); // { name: "jaemin", age: 26 }
