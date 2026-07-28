import { signIn } from "~/server/auth";

export function GoogleSignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
      >
        Entrar com Google
      </button>
    </form>
  );
}
