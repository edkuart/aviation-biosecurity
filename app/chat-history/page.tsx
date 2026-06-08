import type { Metadata } from "next";
import ChatHistoryClient from "./ChatHistoryClient";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Chat History",
  description: "Your saved Aviation Biosecurity study assistant conversations.",
};

export default function ChatHistoryPage() {
  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Tədris Köməkçisi", href: "/study-assistant" },
          { label: "Söhbət Tarixi" },
        ]}
      />

      <section className="bg-av-blue text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🕐</span>
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Söhbət Tarixi
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Keçmiş Söhbətlər
          </h1>
          <p className="text-white/80 text-sm max-w-2xl">
            Tədris köməkçisi ilə apardığınız söhbətlər bu cihazda saxlanılır.
            Qeydiyyat tələb olunmur.
          </p>
        </div>
      </section>

      <div className="px-6 py-8 max-w-4xl mx-auto w-full">
        <ChatHistoryClient />
      </div>
    </div>
  );
}
