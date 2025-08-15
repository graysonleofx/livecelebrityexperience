import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import '../languageSelector.css'

const LanguageSelector = () => {
  useEffect(() => {

    window.gtranslateSettings = {
      "default_language": "en",
      "detect_browser_language": true,
      "languages": ["en", "fr", "it", "es", "de"],
      "wrapper_selector": ".gtranslate_wrapper",
      "switcher_horizontal_position": "inline",
      "float_switcher_open_direction": "bottom",
      "alt_flags": { "en": "usa" }
    };

    window.googleTranslateElementInit = () => {
      setTimeout(() => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
        }, ".google_translate_element");
      }, 500);
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    // script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    
  }, []);

  const handleLanguageChange = (value) => {
    const tryChangeLanguage = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = value;
        select.dispatchEvent(new Event('change'));
      } else {
        setTimeout(tryChangeLanguage, 100); // Retry every 100ms until select exists
      }
    };
    tryChangeLanguage();
  };

  return (
    <div className="gtranslate_wrapper">
      <Select onValueChange={handleLanguageChange} defaultValue="en">
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
      </Select>
    </div>
  );
};

export default LanguageSelector;
