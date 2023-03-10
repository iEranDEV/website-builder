import Layout from "@/components/general/Layout";
import NavItem from "@/components/general/nav/NavItem";
import ProjectsList from "@/components/project/ProjectsList";
import { FiHome, FiSettings, FiUser, FiUsers } from 'react-icons/fi'

export default function Home() {

	const navBarItems = () => {
		return [
			<NavItem key={'projects'} text="Projects" route={'/'}>
                <FiHome className="h-6 w-6"></FiHome>
            </NavItem>,

			<NavItem key={'account'} text="Account" disabled>
                <FiUser className="h-6 w-6"></FiUser>
            </NavItem>,

			<NavItem key={'settings'} text="Settings" disabled>
                <FiSettings className="h-6 w-6"></FiSettings>
            </NavItem>,

			<NavItem key={'teams'} text="Teams" disabled>
                <FiUsers className="h-6 w-6 text-stone-400"></FiUsers>
            </NavItem>,
		]
	}

	return (
		<Layout navbar={navBarItems()}>
			<div className="w-full h-full">
				<div className="w-full p-4 flex flex-col gap-2">
					<h1 className="text-2xl font-bold mono text-neutral-800">Your projects</h1>
				</div>
				<ProjectsList></ProjectsList>
			</div>
		</Layout>
	)
}
