import AdminNavbar from "@/components/navbars/adminNavbar"

export default function AdminLayout({ children }) {
  return (
    <div className="relative h-full w-full bg-[#F8EEDF]">
      <header className="fixed p-4 w-full z-50">
        <AdminNavbar />
      </header>

      <main className="flex justify-center items-center min-h-screen w-screen pt-32 pb-20">
        {children}
      </main>

      <footer className="w-full h-10 text-center text-sm py-4 bg-black">
        <p className="text-white">© 2025 Admin</p>
      </footer>
    </div>
  )
}
