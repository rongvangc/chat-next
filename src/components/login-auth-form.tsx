import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signIn } from "@/services/user";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import { AlertError } from "./alert";
import { setToken } from "@/lib/cookieUtils";

interface LoginAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function LoginAuthForm({ className, ...props }: LoginAuthFormProps) {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const { data, message } = await signIn({
      username,
      password,
    });

    if (message) {
      setErrorMessage(message);
    }

    if (data?.id) {
      setErrorMessage("");
      setToken(data?.access_token);
      replace("/chat");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="username"
              autoCapitalize="none"
              autoCorrect="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>

          {errorMessage && <AlertError />}
        </div>
      </form>
    </div>
  );
}
