
import { useTheme } from "../hooks/useTheme";
import { Button } from "./ui/Button";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
            <span className="material-symbols-outlined">
                {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
        </Button>
    );
};
