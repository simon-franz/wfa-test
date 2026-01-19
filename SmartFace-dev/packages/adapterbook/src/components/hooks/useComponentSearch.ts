import type { HeadlessComboBoxOption, HeadlessComboBoxResponse } from '@hrworks/sui-core/ComboBox';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { map } from '../ExampleComponentMapper';

type UseComponentSearchProps = {
  value: HeadlessComboBoxOption | null;
  query: string;
  getOptions: (searchQuery: string) => Promise<HeadlessComboBoxResponse>;
  onValueChange: (newValue: HeadlessComboBoxOption | null) => void;
  onQueryChange: (newQuery: string) => void;
};

export const useComponentSearch = (): UseComponentSearchProps => {
  const navigate = useNavigate();
  const [value, setValue] = useState<HeadlessComboBoxOption | null>(null);
  const [query, setQuery] = useState('');

  const options = useMemo(() => Object.keys(map).map((key) => ({ id: key, text: key })), []);

  const getOptions: UseComponentSearchProps['getOptions'] = async (searchQuery) => {
    const searchText = searchQuery.toLowerCase();
    const filteredResults = options.filter(({ text }) => text.toLowerCase().includes(searchText));

    return {
      results: filteredResults,
      clientSideFiltering: true,
    };
  };

  const onValueChange: UseComponentSearchProps['onValueChange'] = (newValue) => {
    if (newValue) {
      const lowerCaseName = newValue.id.toLowerCase();
      navigate({ to: '/$componentName', params: { componentName: lowerCaseName } });
      setValue(null);
      setQuery('');
    }
  };

  const onQueryChange: UseComponentSearchProps['onQueryChange'] = (newQuery) => {
    setQuery(newQuery);
  };

  return {
    value,
    query,
    getOptions,
    onValueChange,
    onQueryChange,
  };
};
