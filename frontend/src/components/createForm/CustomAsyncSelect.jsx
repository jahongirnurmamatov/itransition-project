import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import axiosInstance from '@/lib/axiosInstance';

const CustomAsyncSelect = ({ tags, setTags }) => {
  const fetchOptions = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const response = await axiosInstance.get('/tag/search-tags', {
        params: { searchKey: inputValue },
      });
      return response.data.tags.map((tag) => ({
        label: tag.name,
        value: tag.name,
      }));
    } catch (error) {
      console.error('Error fetching options:', error);
      return [];
    }
  };

  const handleCreate = async (inputValue) => {
    try {
      const response = await axiosInstance.post('/tag/create-tag', {
        name: inputValue,
      });
      const newTag = response.data;

      const newOption = {
        label: newTag.name,
        value: newTag.name,
      };

      setTags((prevTags) => [...prevTags, newOption]); 
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const handleChange = (selectedOptions) => {
    setTags(selectedOptions || []); 
  };

  return (
    <AsyncCreatableSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={fetchOptions} 
      onChange={handleChange} 
      onCreateOption={handleCreate} 
      value={tags} 
      placeholder="Select or create tags..."
      className="col-span-3"
    />
  );
};

export default CustomAsyncSelect;
