import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("userId");

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Product Reviews</h1>

        <nav className="space-x-6 text-sm md:text-base">
          {!isLoggedIn && (
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          )}
          <Link
            to="/reviews"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Reviews
          </Link>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 font-medium"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
