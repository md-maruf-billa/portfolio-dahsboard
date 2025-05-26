import ManageSkillTable from "@/components/manage-skill-table";
import {get_skill} from "@/server/skill";
export const dynamic = "force-dynamic";

const Manage_skill_page = async () => {
    const {data} = await get_skill()
    return (
        <div>
            <ManageSkillTable skills={data || []}/>
        </div>
    );
};

export default Manage_skill_page;