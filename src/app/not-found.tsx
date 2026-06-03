import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function NotFound() {
  return (
    <>
      <div className="mt-8">
        <Link href="/">Go to Home</Link>
      </div>
    </>
  );
}
