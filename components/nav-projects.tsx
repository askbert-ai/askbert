"use client"

import {
	Folder,
	Forward,
	MoreHorizontal,
	Trash2,
	type LucideIcon,
} from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"

export function NavProjects({
	projects,
}: {
	projects: {
		name: string
		url: string
		icon: LucideIcon
		isActive?: boolean
	}[]
}) {
	const { isMobile } = useSidebar()

	return (
		<SidebarGroup className={`group-data-[collapsible=icon]:p-2 p-6`}>
			<SidebarGroupLabel className='mb-4 -ml-2'>MAIN MENU</SidebarGroupLabel>
			<SidebarMenu className='gap-4'>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild isActive={item.isActive} className='h-10 p-4 active:font-semibold text-base text-[#91A0B6]'>
							<a href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
