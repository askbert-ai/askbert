import { AppSidebar } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import ModalEmail from './_components/ModalEmail'

const Layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="sticky top-0 bg-white flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
					<div className='flex flex-row items-center'>
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#" className="text-[#91A0B6]">
										Content Copilot
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem className='hidden md:block'>
									<BreadcrumbPage className="text-black font-medium">Upload an Asset</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className='flex flex-row items-center mr-4'>
						<ModalEmail />
						<Image
							src="/images/avatar-02.png"
							alt="Askbert.ai"
							width={40}
							height={40}
						/>
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}

export default Layout
