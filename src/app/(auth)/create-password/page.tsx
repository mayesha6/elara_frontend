import { redirect } from "next/navigation";

export default function CreatePasswordRedirectPage() {
  redirect("/forget-password");
}