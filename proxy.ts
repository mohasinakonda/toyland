import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const authHeader = req.headers.get("authorization");

    // 1. If no auth header is present, trigger the browser's login prompt
    if (!authHeader) {
        return new NextResponse("Authentication required", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Admin Area"',
            },
        });
    }

    // 2. Decode credentials from the Basic Auth header
    const [username, password] = atob(authHeader.split(" ")[1] || "").split(":");

    // 3. Pull expected credentials from env variables (with fallbacks)
    const validUser = process.env.AUTH_USER || "admin";
    const validPass = process.env.AUTH_PASSWORD || "password";

    // 4. Validate credentials; if wrong, prompt again
    if (username !== validUser || password !== validPass) {
        return new NextResponse("Invalid credentials", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Admin Area"',
            },
        });
    }

    // 5. If everything matches, let the request pass through
    return NextResponse.next();
}

// ⚠️ THE CRUCIAL PART: Scope it strictly to your admin routes
export const config = {
    matcher: [
        "/admin",          // Matches the exact /admin page
        "/admin/:path*",   // Matches any sub-pages like /admin/dashboard or /admin/settings
    ],
};