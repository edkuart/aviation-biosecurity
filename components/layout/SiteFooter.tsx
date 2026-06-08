export default function SiteFooter() {
  return (
    <footer className="bg-av-blue-dark text-white/70 text-xs mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div>
          <p className="font-medium text-white text-sm">Aviation Biosecurity Knowledge Platform</p>
          <p className="mt-0.5">
            Educational resource. All content cites authoritative sources.
            Not a substitute for official regulatory guidance.
          </p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <p>Content: Azerbaijani (default) · English (toggle)</p>
          <p>Sources: ICAO · WHO · FAA · EASA · Azerbaijan SCAA</p>
        </div>
      </div>
    </footer>
  );
}
