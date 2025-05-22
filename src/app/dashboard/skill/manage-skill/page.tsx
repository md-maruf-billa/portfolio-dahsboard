import ManageSkillTable from "@/components/manage-skill-table";
import {get_skill} from "@/server/skill";

const Manage_skill_page = async () => {
    const {data} = await get_skill()
    return (
        <div>
            <ManageSkillTable skills={data}/>
        </div>
    );
};

export default Manage_skill_page;