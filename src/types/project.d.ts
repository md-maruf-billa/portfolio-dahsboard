export type TProject = {
    _id?:string,
    projectName: string
    description: string
    slogan: string
    technologies: string[]
    features: string[]
    frontEndGitRepo: string
    backEndGitRepo: string
    liveLink: string
    projectImage?:string
};