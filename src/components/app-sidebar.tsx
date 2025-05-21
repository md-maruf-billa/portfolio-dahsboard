"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map, PanelsTopLeft,
  PieChart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
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
import {LiaFeatherSolid} from "react-icons/lia";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Project's",
      url: "#",
      icon: PanelsTopLeft,
      isActive: true,
      items: [
        {
          title: "Add Project",
          url: "#",
        },
        {
          title: "Manage Project",
          url: "#",
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
          url: "#",
        },
        {
          title: "Manage Skill",
          url: "#",
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
          url: "#",
        },
        {
          title: "Manage Blog",
          url: "#",
        }
      ],
    },
    {
      title: "Featured",
      url: "#",
      icon: LiaFeatherSolid,
      items: [
        {
          title: "Add Featured Project",
          url: "#",
        },
        {
          title: "Manage Featured Project",
          url: "#",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
