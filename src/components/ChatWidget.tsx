import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button aria-label="Open live chat" size="lg" variant="hero" className="rounded-full p-0 h-14 w-14">
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[360px]">
          <SheetHeader>
            <SheetTitle>Live Chat</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex h-full flex-col gap-3">
            <div className="flex-1 rounded-lg border p-3 text-sm text-muted-foreground">
              This is a demo chat UI. Your messages will appear here.
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Type a message..." />
              <Button className="shrink-0" aria-label="Send chat message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatWidget;
