"use client"

import * as React from "react"
import {PanelsTopLeft,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import { GiSkills } from "react-icons/gi";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {FaBloggerB} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {log_out_user_action} from "@/server/auth";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Project's",
      url: "#",
      icon: PanelsTopLeft,
      isActive: true,
      items: [
        {
          title: "Add Project",
          url: "/dashboard/project/add-project",
        },
        {
          title: "Manage Project",
          url: "/dashboard/project/manage-project",
        }
      ],
    },
    {
      title: "Skill's",
      url: "#",
      icon: GiSkills,
      items: [
        {
          title: "Add Skill",
          url: "/dashboard/skill/add-skill",
        },
        {
          title: "Manage Skill",
          url: "/dashboard/skill/manage-skill",
        }
      ],
    },
    {
      title: "Blog's",
      url: "#",
      icon: FaBloggerB,
      items: [
        {
          title: "Add Blog",
          url: "/dashboard/blog/add-blog",
        },
        {
          title: "Manage Blog",
          url: "/dashboard/blog/manage-blog",
        }
      ],
    },
    // {
    //   title: "Featured",
    //   url: "#",
    //   icon: LiaFeatherSolid,
    //   items: [
    //     {
    //       title: "Add Featured Project",
    //       url: "#",
    //     },
    //     {
    //       title: "Manage Featured Project",
    //       url: "#",
    //     }
    //   ],
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const handleLogout =async (): Promise<void> => {
    const res = await log_out_user_action()
    if(res){
      toast.success("Logged out successfully.")
      router.push("/")
    }
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        {/*<NavUser user={data.user} />*/}
        <Button onClick={handleLogout}>Log Out</Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
