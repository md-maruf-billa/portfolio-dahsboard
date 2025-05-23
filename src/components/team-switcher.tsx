"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link";
export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
           <Link href="/dashboard" className={"cursor-pointer"}>
             <SidebarMenuButton
                 size="lg"
                 className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
             >
               <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                 <Image src={"/mypic.jpg"} width={600} height={600} alt={"Abumahid Islam"} className="size-10" />
               </div>
               <div className="grid flex-1 text-left text-sm leading-tight">
                 <span className="truncate font-medium text-primary">Md Abu-Mahid</span>
                 <span className="truncate text-xs">Full-Stack Developer</span>
               </div>
               <ChevronsUpDown className="ml-auto" />
             </SidebarMenuButton>
           </Link>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
