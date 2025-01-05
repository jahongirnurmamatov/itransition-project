import { RiSurveyLine } from "react-icons/ri";
import { MdOutlineTitle } from "react-icons/md";

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

export default function ToggleCreateTitleTab({ setShowRight }) {
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
                <RiSurveyLine className="text-primary" />
              </ToggleButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>{d.questions}</p>
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
                <MdOutlineTitle className="text-primary" />
              </ToggleButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>{d.titleAndDescription}</p>
            </TooltipContent>
          </Tooltip>
        </ToggleButtonGroup>
      </TooltipProvider>
    </Stack>
  );
}
