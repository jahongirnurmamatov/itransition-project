import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Autocomplete, Chip, Stack, TextField } from '@mui/material';
import { useUsersStore } from '@/store/usersStore';
import debounce from 'lodash/debounce'; // Install lodash if not already done
import { useTemplateStore } from '@/store/templateStore';

const ShareWith = () => {
  const { users, searchUsers } = useUsersStore();
  const { setSharedWith, sharedWith } = useTemplateStore();
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = debounce((value) => {
    searchUsers(value);
  }, 500);

  useEffect(() => {
    if (inputValue) {
      debouncedSearch(inputValue);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue]);

  return (
    <div className="grid grid-cols-4 w-full items-center gap-4">
      <Label>Select Visibility</Label>
      <Stack className="col-span-3" spacing={3}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={users || []} // Use the full user objects as options
          value={sharedWith} // Store full user objects in sharedWith
          onChange={(event, newValue) => setSharedWith(newValue)} // Update sharedWith in the store
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          getOptionLabel={(option) => option.username || option.email} // Display username or email
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  variant="outlined"
                  label={option.username || option.email} // Show the username or email in the tag
                  key={option.id} // Use unique user ID as the key
                  {...tagProps}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Search Users"
              placeholder="Type to search"
              className="w-1/2"
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default ShareWith;
