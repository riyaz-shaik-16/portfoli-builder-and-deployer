import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  RiDashboardLine,
  RiToolsLine,
  RiLayoutGridLine,
  RiFileListLine,
  RiPaletteLine,
  RiEyeLine,
  RiCommandLine
} from "@remixicon/react"

const data = {
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: <RiDashboardLine />,
      isActive: true,
    },
    {
      title: "Builder",
      url: "/builder",
      icon: <RiToolsLine />,
      items: [
        {
          title: "Template",
          url: "/builder/template",
          icon: <RiLayoutGridLine />,
        },
        {
          title: "Styling",
          url: "/builder/styling",
          icon: <RiPaletteLine />,
        },
        {
          title: "Details",
          url: "/builder/details",
          icon: <RiFileListLine />,
        },
        {
          title: "Preview",
          url: "/builder/preview",
          icon: <RiEyeLine />,
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div
                className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <RiCommandLine className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Craftly</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
