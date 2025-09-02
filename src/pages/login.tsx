
import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function LoginPage() {
  // plain HTML form; server will handle set-cookie + redirect
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <form
        method="POST"
        action="/api/login"
        style={{ padding: 24, border: "1px solid #ddd", borderRadius: 8, minWidth: 320 }}
      >
        <h1 style={{ marginBottom: 16 }}>Login</h1>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Username</label>
          <input name="username" type="text" required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input name="password" type="password" required style={{ width: "100%", padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: "8px 14px" }}>Login</button>
      </form>
    </div>
  );
}

// If already logged in, bounce to home
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth } = parseCookies(ctx);
  if (auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
