import React from 'react';
import {Manage_Project_Table} from "@/components/manage-project-table";
import {get_all_project} from "@/server/project";
export const dynamic = "force-dynamic";

const Manage_Project = async () => {
    const {data} = await get_all_project()

    return (
        <div>
            <Manage_Project_Table data={data || []}/>
        </div>
    );
};

export default Manage_Project;