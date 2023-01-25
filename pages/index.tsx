import AppWrapper from "@/components/general/AppWrapper";
import ProjectsList from "@/components/project/ProjectsList";
import UserDropdown from "@/components/user/UserDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiSettings, FiUser, FiUsers } from 'react-icons/fi'

export default function Home() {

	const router = useRouter();

	return (
		<AppWrapper>
			<div className="w-screen h-screen flex flex-col">
				{/* Home page navigation */}
				<nav className="w-full bg-stone-100 px-2 shadow flex justify-end md:justify-between items-center relative z-10">
					{/* Nav items */}
					<div className="bg-stone-100 mb-8 md:m-0 rounded-full shadow-xl md:shadow-none fixed md:static bottom-0 px-8 py-4 md:p-0 left-[50%] md:translate-x-0 translate-x-[-50%] flex gap-8 md:gap-0">
						<Link href={'/'} className={`md:p-3 md:border-b-2 ${router.pathname === '/' ? 'text-emerald-500 border-emerald-500' : 'text-stone-700 border-stone-100'}`}>
							<FiHome className="h-6 w-6"></FiHome>
						</Link>
						<Link href={'/'} className='md:p-3 md:border-b-2 border-stone-100'>
							<FiUser className="h-6 w-6 text-stone-700"></FiUser>
						</Link>
						<Link href={'/'} className='md:p-3 md:border-b-2 border-stone-100'>
							<FiSettings className="h-6 w-6 text-stone-700"></FiSettings>
						</Link>
						<Link href={'/'} className='md:p-3 md:border-b-2 border-stone-100 cursor-not-allowed'>
							<FiUsers className="h-6 w-6 text-stone-400 "></FiUsers>
						</Link>
					</div>

					{/* User item */}
					<div className="py-3">
						<UserDropdown></UserDropdown>
					</div>
				</nav>

				{/* Projects list */}
				<div className="h-full w-full bg-stone-200">
					<ProjectsList></ProjectsList>
				</div>
			</div>
		</AppWrapper>
	)
}
