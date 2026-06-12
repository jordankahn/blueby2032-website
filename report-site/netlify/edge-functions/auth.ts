// Site-wide password gate (pre-launch privacy) — password only,
// served as a styled unlock page (no browser basic-auth popup).
//
// ON:  set a SITE_PASSWORD environment variable in Netlify
//      (Site configuration → Environment variables), then trigger
//      a redeploy.
// OFF: delete the SITE_PASSWORD env var and redeploy. This file is
//      inert without the variable — safe to leave in place.
//
// Correct password sets a 30-day cookie (a hash, not the password).
// The password itself lives only in Netlify's env vars, never here.

async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode("blueby2032:" + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function unlockPage(from: string, wrong: boolean): Response {
  const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/";
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>Blue by 2032</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Serif:wght@600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "IBM Plex Sans", -apple-system, Helvetica, Arial, sans-serif;
      background: #fbfbf8; color: #141414;
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
    }
    .card { width: 100%; max-width: 22rem; }
    .brand {
      font-family: "IBM Plex Serif", Georgia, serif;
      font-weight: 600; font-size: 1.9rem; letter-spacing: -0.01em;
      padding-bottom: 1rem; border-bottom: 3px solid #141414; margin-bottom: 1.5rem;
    }
    .brand span { color: #1d4ed8; }
    p { font-size: 0.95rem; color: #565656; margin-bottom: 1.5rem; line-height: 1.5; }
    label { display: block; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.4rem; }
    input[type="password"] {
      width: 100%; font: inherit; font-size: 1rem;
      padding: 0.7rem 0.85rem; border: 1.5px solid #141414; border-radius: 0;
      background: #fff; color: #141414; margin-bottom: 1rem;
    }
    input[type="password"]:focus { outline: none; border-color: #1d4ed8; box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.18); }
    button {
      font: inherit; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.04em;
      width: 100%; padding: 0.7rem 1.15rem; cursor: pointer;
      background: #1d4ed8; color: #fff; border: 1.5px solid #1d4ed8; border-radius: 0;
    }
    button:hover { background: #1740b0; border-color: #1740b0; }
    .err { color: #141414; background: #fff; border: 1.5px solid #141414; padding: 0.6rem 0.85rem; font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <main class="card">
    <div class="brand">Blue by <span>2032</span></div>
    <p>This site isn't public yet. Enter the password to continue.</p>
    ${wrong ? '<div class="err">That password isn’t right — try again.</div>' : ""}
    <form method="POST" action="/__unlock">
      <input type="hidden" name="from" value="${safeFrom.replace(/"/g, "&quot;")}">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autofocus autocomplete="current-password">
      <button type="submit">Enter</button>
    </form>
  </main>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export default async (request: Request) => {
  const password = Netlify.env.get("SITE_PASSWORD");
  if (!password) return; // no password configured — site is public

  const url = new URL(request.url);
  const token = await tokenFor(password);

  // already unlocked?
  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes("site_pass=" + token)) return;

  // unlock attempt
  if (request.method === "POST" && url.pathname === "/__unlock") {
    const body = await request.formData();
    const from = String(body.get("from") || "/");
    if (body.get("password") === password) {
      const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/";
      return new Response(null, {
        status: 303,
        headers: {
          Location: safeFrom,
          "Set-Cookie": `site_pass=${token}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return unlockPage(from, true);
  }

  return unlockPage(url.pathname + url.search, false);
};

export const config = { path: "/*" };
