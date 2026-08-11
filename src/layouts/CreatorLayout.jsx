import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreatorLayout() {

  const user = useSelector((state) => state.auth.user);

  const hasAccess =
    user?.role === "creator" ||
    user?.role === "admin" ||
    user?.role === "superadmin";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="creator-layout">

      <aside>
        {/* Creator Sidebar */}
      </aside>

      <main>
        <Outlet />
      </main>

    </div>
  );
}