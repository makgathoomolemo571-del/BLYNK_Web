import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="public-layout">

      {/* HEADER (optional landing nav) */}
      <header>
        {/* Logo / Public Nav */}
      </header>

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer>
        {/* Public footer links */}
      </footer>

    </div>
  );
};

export default PublicLayout;