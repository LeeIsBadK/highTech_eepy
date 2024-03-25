import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="min-h-[100svh]">
            <Outlet />
        </main>
    )
}

export default Layout
