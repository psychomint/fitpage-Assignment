import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API } from "../../data/DATA";

export default function LoginForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/reviews");
    }
  }, [navigate]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const url = showRegister ? "register" : "login";
    const bodyData = showRegister
      ? form
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(`${BACKEND_API}/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Action failed" });
      } else {
        setMessage({ type: "success", text: data.message });
        if (!showRegister) {
          console.log("Logged in user ID:", data.userId);
          localStorage.setItem("userId", data.userId);
        }
        setForm({ name: "", email: "", password: "" });
        navigate("/reviews");
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setMessage({ type: "error", text: "Server error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showRegister ? "Register" : "Login"}
        </h2>

        {message && (
          <p
            className={`mb-4 text-sm ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {showRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-200 mb-3"
        >
          {showRegister ? "Register" : "Login"}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowRegister((prev) => !prev);
            setMessage(null);
          }}
          className="w-full text-sm text-blue-500 hover:underline"
        >
          {showRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
}
