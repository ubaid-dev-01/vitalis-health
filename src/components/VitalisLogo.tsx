import logo from "@/assets/vitalis-logo.png";

const VitalisLogo = ({ size = 48, showText = true, lightMode = false }: { size?: number; showText?: boolean; lightMode?: boolean }) => (
  <div className="flex items-center gap-3">
    <img src={logo} alt="Vitalis Health" width={size} height={size} className="rounded-2xl object-contain shadow-sm" />
    {showText && (
      <span className="text-xl font-bold tracking-tight">
        <span className={lightMode ? "text-white" : "text-foreground"}>Vitalis</span>
        <span className="text-primary"> Health</span>
      </span>
    )}
  </div>
);

export default VitalisLogo;
