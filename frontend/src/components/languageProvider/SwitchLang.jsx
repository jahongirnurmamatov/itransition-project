import { useLanguageStore } from "@/store/languageStore";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const flagMap = {
  en: "/flag-en.png",
  ru: "/flag-ru.png",
};

const SwitchLang = () => {
  const { language, setLanguage, dictionary } = useLanguageStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <img
            src={flagMap[language]}
            width={24}
            height={24}
            className="rounded-full"
            style={{ aspectRatio: "24/24", objectFit: "cover" }}
          />
          <span className="font-medium">{language==="en"?dictionary.english:dictionary.russian}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>{dictionary.selectLanguage}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setLanguage("en")}>
            <div className="flex items-center gap-2">
              <img
                src="/flag-en.png"
                alt="UK Flag"
                width={24}
                height={24}
                className="rounded-full"
                style={{ aspectRatio: "24/24", objectFit: "cover" }}
              />
              <span>{dictionary.english}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("ru")}>
            <div className="flex items-center gap-2">
              <img
                src="/flag-ru.png"
                alt="Russian Flag"
                width={24}
                height={24}
                className="rounded-full"
                style={{ aspectRatio: "24/24", objectFit: "cover" }}
              />
              <span>{dictionary.russian}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchLang;
