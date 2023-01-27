import Layout from "@/components/general/Layout";
import ProjectsList from "@/components/project/ProjectsList";
import UserDropdown from "@/components/user/UserDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiSettings, FiUser, FiUsers } from 'react-icons/fi'

export default function Home() {

	const navBarItems = () => {
		return [
			<Link key={'home'} href={'/'} className='bg-stone-200/80 flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
				<FiHome className="h-6 w-6"></FiHome>
				<p className="md:hidden">Home</p>
			</Link>,
			<Link key={'account'} href={'/'} className=' bg-stone-200/80 flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
				<FiUser className="h-6 w-6"></FiUser>
				<p className="md:hidden">Account</p>
			</Link>,
			<Link key={'settings'} href={'/'} className=' bg-stone-200/80 flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
				<FiSettings className="h-6 w-6"></FiSettings>
				<p className="md:hidden">Settings</p>
			</Link>,
			<Link key={'teams'} href={'/'} className=' bg-stone-200/80 cursor-not-allowed flex gap-2 items-center'>
				<FiUsers className="h-6 w-6 text-stone-400"></FiUsers>
				<p className="md:hidden">Teams</p>
			</Link>
		]
	}

	return (
		<Layout navbar={navBarItems()}>
			<div className="w-full h-full p-4">
				<ProjectsList></ProjectsList>
			</div>
		</Layout>
	)
}
