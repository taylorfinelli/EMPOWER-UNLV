import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth/auth-service";
import { useNavigate } from "react-router-dom";
import verifyToken from "@/auth/verify-token";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { auth: session, error } = await signIn(username, password);

    setUsername("");
    setPassword("");

    if (error) {
      setLoginError(error);
      return;
    }

    if (session && session.AccessToken) {
      sessionStorage.setItem("accessToken", session.AccessToken);
      const validToken = await verifyToken();

      if (validToken) {
        navigate("/admin");
      } else {
        console.error("Session token was not set properly.");
      }
    }
  };

  return (
    <div className="flex flex-row justify-center pt-12">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <form className="flex flex-col gap-y-2 w-72" onSubmit={handleSignIn}>
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
            {loginError && <Label style={{ color: "red" }}>{loginError}</Label>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
