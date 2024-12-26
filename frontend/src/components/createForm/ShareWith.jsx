import React from 'react'
import { Label } from '../ui/label';
import { Autocomplete, Chip, Stack, TextField } from '@mui/material';

const ShareWith = () => {
  return (
    <div className='grid grid-cols-4 w-full items-center gap-4'>
        <Label>Select Visibility</Label>
        <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
            multiple
            id="tags-filled"
            options={top100Films.map((option) => option.title)}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip variant="outlined" label={option} key={key} {...tagProps} />
                );
              })
            }
            renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
            />
        )}
        />
        </Stack>
    </div>
  )
}

export default ShareWith

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    } ]