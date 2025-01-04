import { FaChartPie } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguageStore } from "@/store/languageStore";

export default function ToggleTab({ setShowRight }) {
  const [alignment, setAlignment] = useState("left");
  const {dictionary:d} = useLanguageStore();

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Stack direction="row" spacing={4}>
      <TooltipProvider>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          className="bg-primary-foreground"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleButton
                onClick={() => {
                  setShowRight(false);
                }}
                value="left"
                aria-label="left aligned"
              >
                <FaWpforms className="text-primary" />
              </ToggleButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>{d.template}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleButton
                onClick={() => {
                  setShowRight(true);
                }}
                value="right"
                aria-label="right aligned"
              >
                <FaChartPie className="text-primary" />
              </ToggleButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>{d.analytics}</p>
            </TooltipContent>
          </Tooltip>
        </ToggleButtonGroup>
      </TooltipProvider>
    </Stack>
  );
}
