# NextJS Introduction

## Next.js 프로젝트 초기화

```bash
npx create-next-app@latest

# typescript version
npx create-next-app@latest --typescript
```

[공식 문서](https://nextjs.org/docs/getting-started)

## #1 FRAMEWORK OVERVIEW

### Library vs Framework

- library: 개발자로서 내가 사용하는 것
    - 내가 원할 때 언제든 불러서 사용하면 된다. 자유도가 높다.
- framework: 나의 코드를 불러오는 것
    - 특정한 규칙에 따라서 코드를 작성해야한다.

### NextJS 특징

- **Static Pre Rendering**
    - 초기 상태로 pre-rendering을 하여 빈 화면을 보여주는 것을 막는다.
    - next.js는 react.js를 백엔드에서 동작시켜서 초기 상태의 component로 된 미리 생성된 html 페이지를 보여준다.
    - 유저는 자바스크립트와 react.js가 로딩되지 않았더라도 콘텐츠를 볼 수 있다.
    - react가 로딩되었을 때 기본적으로 이미 존재하는 것들과 연결이 되어서 일반적인 리액트 앱이 된다. →이 과정을 hydration이라고 한다. 처음에는 매마른 뼈대만 있다가 리액트js와 연결하여 동작하는 리액트앱을 만드는 것.
    - SEO에 좋다.
- **Routing**

    ```jsx
    <Link href="/">
    	<a className="home-css">home</a>
    </Link>
    ```

- **CSS Modules**
    - 파일별로 css는 독립적으로 적용된다. object property로 사용할 수 있음.
    - [사용법](https://github.com/thehue/nextjs-introduction/commit/09f7b1a8bb92627be4f6b224be01473369a7cedf)
- **Styles JSX**
    - 컴포넌트 내부로 범위가 한정된다. class명이 같아도 다르게 적용됨.
    - [사용법](https://github.com/thehue/nextjs-introduction/commit/9914ec90f02af792b789b89ab7c45915534dab6f)
- [**Custom App**](https://github.com/thehue/nextjs-introduction/commit/cce963ca9f6d473aa34b7ac0586007cbced2c50b)

    ```jsx
    import NavBar from "../components/NavBar";
    
    export default function Home() {
      return (
        <div>
          <NavBar />
          <h1 className="active">Hello</h1>
          <style jsx global>
            {`
              a {
                color: white;
              }
            `}
          </style>
        </div>
      );
    }
    ```

    - Home Component를 렌더링하지 않는 경우에는 style 태그의 global 속성을 이용해도 전역으로 작동되지 않는다.
    - _app.js를 통해서 해결한다. - nextjs는 가장 먼저 _app을 보고 index.js 내용물을 렌더링한다.
        - _app.js는 하나의 blueprint라고 볼 수 있다.
        - custom <App>에서는 css파일을 import할 수 있다.(다른 컴포넌트 파일에서는 module만 가능)