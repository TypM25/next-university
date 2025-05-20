import AdminNavbar from "@/components/navbars/adminNavbar"


export default function AdminLayout({ children }) {
  return (
    <div className='relative min-h-screen w-screen bg-[#F8EEDF]'>
      <div className='fixed p-4 w-full z-50'>
        <AdminNavbar />
      </div>
      <div className='flex justify-center items-center min-h-screen w-screen py-28'>
        {children}
        
      </div>
     
    </div>
  )
}