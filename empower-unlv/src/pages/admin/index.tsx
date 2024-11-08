import { useEffect, useState } from "react";
import { validateToken } from "./utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    validateToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store the JWT token
      // Redirect or update state to show logged-in user
      window.location.href = "/admin";
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-row justify-center pt-12">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <form className="flex flex-col gap-y-2 w-72" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Login</Button>
            {error && <Label style={{ color: "red" }}>{error}</Label>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
