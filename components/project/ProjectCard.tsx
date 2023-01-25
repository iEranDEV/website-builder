function ProjectCard({project}: {project?: Project,}) {

    if(project) {
        return (
            <div>{JSON.stringify(project)}</div>
        )
    } else {
        return (
            <div>add</div>
        )
    }
}

export default ProjectCard;