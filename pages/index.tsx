import { UserContext } from "@/context/UserContext"
import { useContext } from "react";

export default function Home() {

	const userContext = useContext(UserContext);
	const user = userContext.user;

	return (
		<div className="text-3xl">
			test
			<br />
			{user && <p>{JSON.stringify(user)}</p>}
		</div>
	)
}
