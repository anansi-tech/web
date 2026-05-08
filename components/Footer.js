import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-anansi-line px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.03) 20%, transparent 58%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-anansi-red/55 to-transparent pointer-events-none" />
      <div className="max-w-[1200px] h-12 md:h-14 mx-auto flex flex-row items-center justify-between gap-4 relative">
        <div className="w-[68px] md:w-[86px] flex items-center justify-center shrink-0">
          <Image
            src="/brand/wordmark/anansi-wordmark-primary.svg"
            alt="Anansi"
            width={1916}
            height={821}
            className="w-full h-auto invert opacity-90 block"
          />
        </div>
        <div className="flex gap-3 md:gap-5 items-center justify-end text-right min-w-0">
          <span className="text-[10px] md:text-[11px] text-white/38 tracking-wider truncate">
            © {new Date().getFullYear()} Anansi Technology LLC
          </span>
          <span className="hidden sm:inline text-[10px] md:text-[11px] text-white/32 tracking-wider shrink-0">
            Miami, FL
          </span>
        </div>
      </div>
    </footer>
  );
}
