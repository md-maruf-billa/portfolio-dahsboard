import React from 'react';
import ManageBlogsTable from "@/components/manage-blog-table";
import {get_all_blogs} from "@/server/blog";

const Page = async () => {
    const {data} = await get_all_blogs()
    return (
        <div>
            <ManageBlogsTable blogs={data}/>
            
        </div>
    );
};

export default Page;