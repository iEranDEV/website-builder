function ProjectSettings({ project }: {project: Project}) {
    

    return (
        <div className="w-full h-full overflow-x-auto flex flex-col gap-8">
            <h1 className="font-bold text-emerald-500 text-3xl mono">Project settings</h1>

            <div className="w-full flex flex-col gap-2">
                <p className="text-stone-400 mono font-bold mb-2">Your project</p>
                <table className="text-sm max-w-[32rem] text-stone-700 flex flex-col gap-1">
                    <tr>
                        <td className="w-40">Project name</td>
                        <td className="w-40 font-semibold">{project.name}</td>
                    </tr>
                    <tr>
                        <td className="w-40">Project ID</td>
                        <td className="w-40 font-semibold">{project._id}</td>
                    </tr>
                    <tr>
                        <td className="w-40">Created at</td>
                        <td className="w-40 font-semibold">{new Date(project.createdAt).toLocaleDateString()}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ProjectSettings;