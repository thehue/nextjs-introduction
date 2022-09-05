import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="title">Hello</h1>
      <style jsx>{`
        .title {
          color: blueviolet;
        }
      `}</style>
    </div>
  );
}
