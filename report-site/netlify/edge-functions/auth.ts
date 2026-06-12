// Site-wide password gate (pre-launch privacy).
//
// ON:  set a SITE_PASSWORD environment variable in Netlify
//      (Site configuration → Environment variables), then trigger
//      a redeploy. Every URL then requires the password (any
//      username) via the browser's built-in prompt.
// OFF: delete the SITE_PASSWORD env var and redeploy. This file is
//      inert without the variable — safe to leave in place.
//
// The password lives only in Netlify's env vars, never in this
// public repo.
export default async (request: Request) => {
  const password = Netlify.env.get("SITE_PASSWORD");
  if (!password) return; // no password configured — site is public

  const header = request.headers.get("authorization") || "";
  if (header.startsWith("Basic ")) {
    try {
      // accept any username; compare only the password portion
      const supplied = atob(header.slice(6)).split(":").slice(1).join(":");
      if (supplied === password) return; // authed — serve the site
    } catch {
      // malformed header — fall through to the 401
    }
  }

  return new Response("This site isn't public yet. Enter the password to continue.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Blue by 2032"',
      "Content-Type": "text/plain",
    },
  });
};

export const config = { path: "/*" };
