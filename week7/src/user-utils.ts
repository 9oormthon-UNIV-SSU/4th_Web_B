// 📂 user-utils.ts

// 1. User 타입 정의
// --------------------------------------
// 아래 요구사항을 만족하는 User 타입을 정의해보세요.
// - id: number
// - name: string
// - email: string
// - isAdmin: boolean

type User = {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
};

// 2. Partial 유틸리티 타입 활용
// --------------------------------------
// 모든 필드를 선택적으로 만드는 UserUpdateForm 타입을 만들어보세요.

type UserUpdateForm = Partial<User>;

// 아래는 예시입니다. 자유롭게 콘솔로 확인해보세요.
const updateForm: UserUpdateForm = {
    name: '강예은',
    email: 'kangyeeun55@gmail.com',
};

// 3. Record 유틸리티 타입 활용
// --------------------------------------
// User 타입을 id 기준으로 관리하는 userMap을 만들어보세요.

const userMap: Record<number, User> = {
    // TODO: 임의의 유저 두 명을 추가해보세요.
    1: { id: 1, name: 'Alice', email: 'alice@example.com', isAdmin: false },
    2: { id: 2, name: 'Bob', email: 'bob@example.com', isAdmin: true },
};

// 4. 제네릭 함수 만들기
// --------------------------------------

// 4-1. identity 함수
// 전달받은 값을 그대로 반환하는 제네릭 함수를 만들어보세요.
function identity<T>(value: T): T {
    // TODO
    return value;
}

// 4-2. getFirstItem 함수
// 배열의 첫 번째 요소를 반환하는 함수입니다.
function getFirstItem<T>(arr: T[]): T | undefined {
    // TODO
    return arr[0];
}

// 4-3. merge 함수
// 두 객체를 합쳐 하나의 객체로 반환합니다.
function merge<T, U>(a: T, b: U): T & U {
    // TODO
    return { ...a, ...b };
}

// 5. 테스트 (출력 확인)
console.log(identity<number>(123));
console.log(getFirstItem<string>(['a', 'b', 'c']));
console.log(merge({ name: 'yeeun' }, { age: 24 }));
