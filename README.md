# SRP 실습 복습 (Auth, Todo)
수업 시간에 실습한 코드 다시 짜면서 복습

## 배운 점
* 클래스형 컴포넌트, context API, fetch 사용
* interface 파일에 선 추상 후 구현

## 코드 작성 순서
0. Base Code (components, App.js 셋팅)
1. 토큰을 관리하는 storage (로컬스토리지)
2. fetch 요청의 공통사항을 처리하는 httpClient
3. API 요청을 하는 service
4. 요청 반환값과 요청 함수를 내려보내는 context
5. 최상단 index.js에서 모든 클래스 호출 및 Provider로 context 주입

## API 스펙

### [출처: 선발과제 깃허브](https://github.com/walking-sunset/selection-task)

## 1) Auth

---

## 1-1) SignUp

### 요청

- URL: `/auth/signup`
- Method: `POST`
- Headers:
  - Content-Type: `application/json`
- Body:
  - email: string
  - password: string

### 응답 예시

- status: 201 Created
- body: 없음

## 1-2) SignIn

### 요청

- URL: `/auth/signin`
- Method: `POST`
- Headers:
  - Content-Type: `application/json`
- Body:
  - email: string
  - password: string

### 응답 예시

- status: 200 OK
- body
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjo0LCJpYXQiOjE2NTk5MDQyMTUsImV4cCI6MTY2MDUwOTAxNX0.DyUCCsIGxIl8i_sGFCa3uQcyEDb9dChjbl40h3JWJNc"
  }
  ```

## 2) Todo

## 2-1) createTodo

### 요청

- URL: `/todos`
- Method: `POST`
- Headers:
  - Authorization: `Bearer access_token`
  - Content-Type: `application/json`
- Body:
  - todo: string

### 응답 예시

- status: 201 Created
- body
  ```json
  {
    "id": 1,
    "todo": "과제하기",
    "isCompleted": false,
    "userId": 1
  }
  ```

## 2-2) getTodos

### 요청

- URL: `/todos`
- Method: `GET`
- Headers:
  - Authorization: `Bearer access_token`

### 응답 예시

- status: 200 OK
- body
  ```json
  [
    {
      "id": 1,
      "todo": "todo2",
      "isCompleted": false,
      "userId": 1
    },
    {
      "id": 2,
      "todo": "todo3",
      "isCompleted": false,
      "userId": 1
    }
  ]
  ```

## 2-3) updateTodo

### 요청

- URL: `/todos/:id`
- Method: `PUT`
- Headers:
  - Authorization: `Bearer access_token`
  - Content-Type: `application/json`
- Body:
  - todo: string
  - isCompleted: boolean

### 요청 예시

- URL: `/todos/1`
- body
  ```json
  {
    "todo": "Hello World",
    "isCompleted": true
  }
  ```

### 응답 예시

- status: 200 OK
- body
  ```json
  {
    "id": 1,
    "todo": "Hello World",
    "isCompleted": true,
    "userId": 2
  }
  ```

## 2-4) deleteTodo

### 요청

- URL: `/todos/:id`
- Method: `DELETE`
- Headers:
  - Authorization: `Bearer access_token`

### 요청 예시

- URL: `/todos/1`
- body: 없음

### 응답 예시

- status: 204 No Content
- body: 없음
