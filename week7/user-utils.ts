// 📂 user-utils.ts

// 1. User 타입 정의
// --------------------------------------
type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

// 2. Partial 유틸리티 타입 활용
// --------------------------------------
type UserUpdateForm = Partial<User>;

const updateForm: UserUpdateForm = {
  name: "수정된 이름",
  email: "updated@email.com",
};

// 3. Record 유틸리티 타입 활용
// --------------------------------------
const userMap: Record<number, User> = {
  1: { id: 1, name: "Alice", email: "alice@example.com", isAdmin: false },
  2: { id: 2, name: "Bob", email: "bob@example.com", isAdmin: true },
};

// 4. 제네릭 함수 만들기
// --------------------------------------

// 4-1. identity 함수
function identity<T>(value: T): T {
  return value;
}

// 4-2. getFirstItem 함수
function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 4-3. merge 함수
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// 5. 테스트 (출력 확인)
console.log(identity<number>(123)); // 123
console.log(getFirstItem<string>(["a", "b", "c"])); // "a"
console.log(merge({ name: "jaemin" }, { age: 26 })); // { name: "jaemin", age: 26 }
