import { Link } from "react-router-dom";
import { Button, Card } from "../components/UI";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-slate-50 px-4">
      <Card className="max-w-lg p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
          404
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>
        <div className="mt-6 flex justify-center">
          <Button as={Link} to="/">
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
