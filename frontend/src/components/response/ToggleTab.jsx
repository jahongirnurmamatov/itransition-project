import { FaChartPie } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";

export default function ToggleTab({setShowRight}) {
  const [alignment, setAlignment] = useState('left');


  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Stack direction="row" spacing={4}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        className="bg-primary-foreground"
      >
        <ToggleButton 
         onClick={()=>{
          setShowRight(false);
        }}
        value="left" aria-label="left aligned">
          <FaWpforms className="text-primary"/>
        </ToggleButton>
        <ToggleButton onClick={()=>{
          setShowRight(true);
        }}
        value="right" aria-label="right aligned">
          <FaChartPie className="text-primary" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
