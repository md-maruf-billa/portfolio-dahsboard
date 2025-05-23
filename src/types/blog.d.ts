export type TBlog ={
    _id?:string,
    title:string
    content:string
    blogTags:string[],
    blogImage?:string,
    createdAt?:string,
    isPublished?:boolean,
    isDeleted?:boolean,

}