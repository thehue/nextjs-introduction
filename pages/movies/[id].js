import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { title } = router.query;

  return <h4>{title || "Loading..."}</h4>;
}
