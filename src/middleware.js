
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';


export async function middleware(req) {
    console.log("Middleware is running!.........");

    // const token = AuthService.getToken();
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    console.log("Token from cookie:", token);

    try {
        if (!token) {
            console.log("Unauthorized!");
            return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
        }

        const decoded = jwtDecode(token);
        console.log("Role : ..............." + decoded.role)
        const roleUser = decoded.role;
        // console.log(roleUser)
        const { pathname } = req.nextUrl;

        if (roleUser) {
            //============================================ADMIN====================================================
            if (roleUser.includes("admin")) {
                console.log("นี่คือ admin");
                if (pathname === "/") {
                    // เปลี่ยนเส้นทางผู้ดูแลระบบไปที่ /admin เมื่อพวกเขาอยู่ที่รูท
                    return NextResponse.redirect(new URL("/admin", req.url));
                }
                const adminAllowedPaths = [
                    "/admin",
                    "/admin/student/studentAll",
                    "/admin/student/studentReg",
                    "/admin/student/studentFind",
                    "/admin/student/studentCreate",
                    "/admin/student/studentUpdate",

                    "/admin/teacher/teacherAll",
                    "/admin/teacher/teacherReg",
                    "/admin/teacher/teacherReg",
                    "/admin/teacher/teacherUpdate",
                    "/admin/teacher/teacherRating",

                    "/admin/subject/subjectAll",
                    "/admin/subject/subjectUpdate",

                    "/admin/user/userAll",
                    "/admin/user/userReg",
                    "/admin/user/userUpdate",

                    "/admin/semester/semesterUpdate",
                    "/admin/semester/semesterAll"
                ];
                if (adminAllowedPaths.includes(pathname)) {
                    return NextResponse.next(); // Allow access to correct pages for admin
                } else {
                    console.log("admin is not allowed to access this page");
                    return NextResponse.redirect(new URL("/admin", req.url));
                }
            }
            //============================================STUDENT====================================================
            if (roleUser.includes("student")) {
                console.log("นี่คือ student");
                if (pathname === "/") {
                    // เปลี่ยนเส้นทางนิสิตไปที่ /student เมื่อพวกเขาอยู่ที่รูท
                    return NextResponse.redirect(new URL("/student", req.url));
                }
                const studentAllowedPaths = [
                    "/student",
                    "/student/create",
                    "/student/information",
                    "/student/subject/subjectAll",
                    "/student/subject/subjectUpdate",
                    "/student/evaluation",

                ];
                if (studentAllowedPaths.includes(pathname)) {
                    return NextResponse.next(); // Allow access to correct pages for student
                } else {
                    console.log("student is not allowed to access this page");
                    return NextResponse.redirect(new URL("/teacher", req.url));
                }
            }
            //============================================Teacher====================================================
            if (roleUser.includes("teacher")) {
                console.log("นี่คือ Teacher");
                if (pathname === "/") {
                    // เปลี่ยนเส้นทางนิสิตไปที่ /teacher เมื่อพวกเขาอยู่ที่รูท
                    return NextResponse.redirect(new URL("/teacher", req.url));
                }
                const teacherAllowedPaths = [
                    "/teacher",
                    "/teacher/create",
                    "/teacher/subject/add",
                    "/teacher/subject/remove",

                    "/teacher/grade/gradeCreate",
                    "/teacher/grade/gradeAll",

                ];
                if (teacherAllowedPaths.includes(pathname)) {
                    return NextResponse.next(); // Allow access to correct pages for teacher
                } else {
                    console.log("teacher is not allowed to access this page");
                    return NextResponse.redirect(new URL("/teacher", req.url));
                }
            }
        }
        // If no matching role, allow the request to proceed
        console.log("Token not found in cookie");
        return NextResponse.redirect(new URL("/login", req.url));
    } catch (error) {
        console.error("Error in middleware:", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}


export const config = {
    matcher: ['/admin/:path*', '/student/:path*'],
}
