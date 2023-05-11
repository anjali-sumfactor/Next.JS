import { useRouter } from "next/router";

export default function DynamicRoute() {
    const router = useRouter();
    const query = router.query.dynamic;
    console.log("query", query);

    return (
        <>
            <title>{query}</title>
            <div>Hi there I am a dynamic route {query}</div>
        </>
    )
};