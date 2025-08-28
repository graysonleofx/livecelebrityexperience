import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import '../languageSelector.css'

const LanguageSelector = () => {
  useEffect(() => {
    window.gtranslateSettings = {
      "default_language":"en",
      "detect_browser_language":true,
      "languages":["en","es","de","fr"],
      "wrapper_selector":".gtranslate_wrapper",
      "switcher_horizontal_position":"inline",
      "float_switcher_open_direction":"bottom",
      "alt_flags":{"en":"usa"}
    }

    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="gtranslate_wrapper">
      {/* <Select onValueChange={handleLanguageChange} defaultValue="en">
        <SelectTrigger>
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="it">Italian</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="de">German</SelectItem>
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default LanguageSelector;
