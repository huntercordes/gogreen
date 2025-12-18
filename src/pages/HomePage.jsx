import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user, signOut } = useAuth();

  return (
    <main style={{ padding: 16 }}>
      <h1>GoGreen</h1>
      <p>Signed in as: {user?.email}</p>

      <button onClick={signOut} style={{ padding: 10 }}>
        Log out
      </button>

      <hr style={{ margin: "16px 0" }} />

      <p>Next: build “My Lists” + list items with eco score + packaging.</p>
    </main>
  );
}
