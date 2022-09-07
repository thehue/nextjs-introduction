import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();

  return <div>{router.query.id}</div>;
}
