import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <header className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-zinc-900">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          to="/"
          className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg tracking-tight"
        >
          🌸 FlowerShop
        </Link>
        <nav className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-transparent border-none p-0 cursor-pointer"
          >
            Catalog
          </button>
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Admin Panel
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
