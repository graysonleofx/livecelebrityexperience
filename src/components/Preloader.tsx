import { Loader2 } from "lucide-react";

interface PreloaderProps { loading: boolean }

const Preloader = ({ loading }: PreloaderProps) => {
  return (
    <div
      aria-hidden={!loading}
      className={`fixed inset-0 z-50 grid place-items-center bg-background transition-opacity duration-500 ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
          <Loader2 className="h-6 w-6 animate-spin text-primary-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Loading Celebrity Experience...</p>
      </div>
    </div>
  );
};

export default Preloader;
