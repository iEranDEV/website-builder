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

			<NavItem key={'account'} text="Account">
                <FiUser className="h-6 w-6"></FiUser>
            </NavItem>,

			<NavItem key={'settings'} text="Settings">
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
				<ProjectsList></ProjectsList>
			</div>
		</Layout>
	)
}
