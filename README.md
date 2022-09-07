# NextJS Introduction

## Next.js 프로젝트 초기화

```bash
npx create-next-app@latest

# typescript version
npx create-next-app@latest --typescript
```

[공식 문서](https://nextjs.org/docs/getting-started)

## #1 Framework Overview

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


## #2 Practice Project

- Next.js에서 자주 사용되는 [Pattern](https://github.com/thehue/nextjs-introduction/commit/8bbf4f95c834d2d87d4662aa08283170fa4598ef) - Layout
- **[Redirects and Rewrite](https://github.com/thehue/nextjs-introduction/commit/32b192f967b709adf2d3d93c8844576170fde608)**

    ```jsx
    /** @type {import('next').NextConfig} */
    const API_KEY = process.env.API_KEY;
    
    const nextConfig = {
      reactStrictMode: true,
      swcMinify: true,
      images: {
        domains: ["image.tmdb.org"],
      },
      async redirects() {
        return [
          {
            source: "/contact",
            destination: "/form",
            permanent: false,
          },
        ];
      },
      async rewrites() {
        return [
          {
            source: "/api/movies",
            destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          },
        ];
      },
    };
    
    module.exports = nextConfig;
    ```

  - permanent - 브라우저나 검색엔진이 이 정보를 기억하는지 여부를 결정한다.
  - source: “/old-blog/:path*” - 주소 뒤에 별표를 붙여 주면 모든 걸 catch 할 수 있다.
  - rewrites: redirect시키긴 하지만 URL은 변하지 않는다. (proxy)
    - 위 코드와 같이 브라우저에서 api key를 숨길 수 있다.
- **[Server Side Rendering](https://github.com/thehue/nextjs-introduction/commit/3f0991b0e7988a9a9c5d7723dedfa39ce67595a5)**
  - getServerSideProps
    - page에서 서버 측 렌더링 함수인 getServerSideProps함수를 export하는 경우 Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render합니다. 서버측에서만 실행되며 브라우저에서는 실행되지 않는다.
    - API를 통해서 데이터를 받아오기 전까지는 화면에 아무것도 받아오지 않는다.
      - NavigationBar, Footer등 아무것도 받아오지 않는다.
      - nextJS는 데이터를 받아오고 pageProps로 넘겨준다.
      - 데이터가 유효할 때 까지 빈화면을 보여준다 vs 로딩 화면을 보여준다 → 각 페이지에 맞게 선택해야된다.
- [**환경 변수 파일 사용법**](https://velog.io/@gytlr01/NextJS%EC%97%90%EC%84%9C-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%EB%8B%A4%EB%A3%A8%EA%B8%B0with-vercel)
  - .env.local
  - NEXT_PUBLIC을 앞에 붙이면 클라이언트에서 접근이 가능하다.
  - NEXT_PUBLIC을 붙이지 않는 경우 서버에서만 접근 가능함.
    - getServerSideProps에서 사용한다면 NEXT_PUBLIC을 붙이지 않기
  - NEXT_PUBLIC을 붙이지 않고 클라이언트에서 접근하는 방법
    - next.cofing.js에 env 속성을 추가해준다.

      ```jsx
      module.exports = {
          env: {
              API_KEY: process.env.API_KEY
          }
      }
      ```

- [Dynamic Routes](https://github.com/thehue/nextjs-introduction/commit/05dc5d2a89adb70ae842024ef2cd575033e69bab)
  - page폴더에 [query명].js 파일을 만들어 Dynamic Route를 생성할 수 있습니다.
- [NextRouter mask 기능](https://github.com/thehue/nextjs-introduction/commit/ae12830e386851051b2d8bd131915625c080f503)
  - query에 데이터를 전달하면서 보이는 URL은 다르게 보이게 할 수 있다.
  - [Link 컴포넌트에서도 as props 사용 가능](https://nextjs.org/docs/api-reference/next/link)
- [Catch All Routes](https://github.com/thehue/nextjs-introduction/commit/773a8629eba9572cb8d124f9c61d10ec23b9c5db) - […params].js

    ```jsx
    const router = useRouter(); // 새로고침시 error
    const [id, title] = router.query.params;
    
    console.log(router);
    
    // 새로고침시 찍히는 로그
    ServerRouter {
      route: '/movies/[...params]',
      pathname: '/movies/[...params]',
      query: {},
      asPath: '/movies/[...params]',
      isFallback: false,
      basePath: '',
      locale: undefined,
      locales: undefined,
      defaultLocale: undefined,
      isReady: false,
      domainLocales: undefined,
      isPreview: false,
      isLocaleDomain: false
    }
    ```

  - router의 query에 데이터를 넘겨서 컴포넌트 내부에서 렌더링하게 되면 pre-render시점의 ServerRouter에는 빈 object, {} 를 받아오기 때문에 새로고침시 오류가 난다. (useRouter는 client-side에서만 실행됨.)
  - 따라서 다음과 같이 수정합니다.

    ```jsx
    const [title, id] = router.query.params || [];
    ```

  - server side rendering이 끝나고 js가 로딩되어 react로 권한이 넘어갔을 때 제대로 query.params를 로드하여 오류가 나지 않게 된다.
  - user에게 로딩 상태를 보여주고 싶지 않을 때(SEO에 최적화하고 싶을때) `getServerSideProps`를 통하여 다음과 같이 수정합니다.

    ```jsx
    export default function Detail({ params }) {
      const [title, id] = params || [];
    
      return <h4>{title || "Loading..."}</h4>;
    }
    
    export function getServerSideProps({ query: { params } }) {
      return {
        props: { params },
      };
    }
    ```

- [404 에러 페이지](https://github.com/thehue/nextjs-introduction/commit/06cb6d1a19b2ffb896f361d7b1dc60c66ad03f2e)
  - pages 폴더에 404.js를 생성

[수료증 링크](https://pdfswitch.s3.ap-northeast-2.amazonaws.com/pdfswitch/d/2/2022-09/3ce3313e500f4cbd8b4962e58fcd45e3/f7501cd3-c067-4f17-bab2-620accb39545)