import { loginPath, adminPath, getRole } from '@/domain/auth'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  // set cookie for 'Logged In'
  supabaseResponse.cookies.set('is-logged-in', user ? 'true' : 'false');

  // if user is not authenticated, redirect to /login
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/admin'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }
  
  if (user) {

    // Fetch the user role from database
    const role = await getRole(user.id);
    // if user is not authorized, redirect to /
    if (
      request.nextUrl.pathname.startsWith('/admin') &&
      role != "admin"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  /*if (
    !user &&
    !request.nextUrl.pathname.startsWith(loginPath) &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = loginPath;
    return NextResponse.redirect(url)
  }*/

  /*if (user) {
    // Fetch the user role from database
    const { data: userProfile } = await supabase
    .from('user_info')
    .select(`
      user_roles (
        role
      )
      `)
    .eq('id', user.id)
    .single();

    const role = userProfile?.user_roles.role;

    // Add role-based route protection
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/dashboard') && role !== 'customer') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }*/

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}