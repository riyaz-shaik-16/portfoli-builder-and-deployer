import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"


const DashboardLayout = ({ parent, title }) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>

                {/* Parent */}
                {parent && (
                  <BreadcrumbItem>
                    {title ? (
                      <BreadcrumbLink asChild>
                        <Link to={`/${parent.toLowerCase()}`}>
                          {parent}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>
                        {parent}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                )}

                {/* Separator only if title exists */}
                {parent && title && <BreadcrumbSeparator />}

                {/* Title */}
                {title && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}

              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-1 flex-col p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
