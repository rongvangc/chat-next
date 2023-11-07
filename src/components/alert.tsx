import { RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertError({ errorMessage }: { errorMessage: string }) {
  return (
    <Alert variant="destructive">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
