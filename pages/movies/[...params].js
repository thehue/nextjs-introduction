import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const [title, id] = params || [];

  return (
    <div>
      <Seo title={title} />
      <h4>{title || "Loading..."}</h4>
      <p>{id}</p>
    </div>
  );
}

export function getServerSideProps({ query: { params } }) {
  return {
    props: { params },
  };
}
