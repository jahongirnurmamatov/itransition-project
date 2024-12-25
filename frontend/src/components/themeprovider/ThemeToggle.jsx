
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { Button } from "../ui/button"
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GoSun } from "react-icons/go";


export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-12 h-12 bg-primary-foreground"
    >
        <GoSun className="w-12 h-12 dark:hidden" /> 
        <BsFillMoonStarsFill className="w-12 h-12 hidden dark:block" /> 
    </Button>
  )
}