import { Sidebar } from "@/components/sidebar";

export default function LayoutDoApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:grid md:grid-cols-[15rem_1fr]">
      <Sidebar />
      <main className="w-full max-w-6xl px-5 py-7 md:px-10 md:py-10">{children}</main>
    </div>
  );
}