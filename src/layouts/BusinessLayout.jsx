import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BusinessLayout() {

  const user = useSelector((state) => state.auth.user);

  const hasAccess =
    user?.role === "business" ||
    user?.role === "admin" ||
    user?.role === "superadmin";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="business-layout">

      <aside>
        {/* Business Sidebar */}
      </aside>

      <main>
        <Outlet />
      </main>

    </div>
  );
}