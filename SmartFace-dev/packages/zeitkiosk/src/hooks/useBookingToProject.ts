import type { HeadlessComboBoxOption, HeadlessComboBoxResponse } from '@hrworks/sui-core/ComboBox';
import { useState } from 'react';

const exampleProjects = [
  {
    client: 'HRworks',
    id: 'proj-001',
    name: 'Website Redesign',
    beginDate: '2024-01-15',
    endDate: '2024-06-30',
    description: 'Complete overhaul of company website with modern UI/UX',
    parentProjectId: '',
    status: 'active' as const,
    hourlyBudget: 500,
    projectManagerPersonnelNumber: 'PM001',
    customerId: 'cust-001',
  },
  {
    client: 'TimeMafia',
    id: 'proj-002',
    name: 'Mobile App Development',
    beginDate: '2024-02-01',
    endDate: '2024-08-15',
    description: 'Native mobile application for iOS and Android platforms',
    parentProjectId: '',
    status: 'active' as const,
    hourlyBudget: 800,
    projectManagerPersonnelNumber: 'PM002',
    customerId: 'cust-002',
  },
  {
    client: 'DATEV',
    id: 'proj-003',
    name: 'Database Migration',
    beginDate: '2024-03-10',
    endDate: '2024-05-20',
    description: 'Migration from legacy database to cloud-based solution',
    parentProjectId: '',
    status: 'active' as const,
    hourlyBudget: 300,
    projectManagerPersonnelNumber: 'PM001',
    customerId: 'cust-003',
  },
];

type UseBookingToProjectProps = {
  value: HeadlessComboBoxOption | null;
  query: string;
  getOptions: (searchQuery: string) => Promise<HeadlessComboBoxResponse>;
  onValueChange: (newValue: HeadlessComboBoxOption | null) => void;
  onQueryChange: (newQuery: string) => void;
};

export const useBookingToProject = () => {
  const [value, setValue] = useState<HeadlessComboBoxOption | null>(null);
  const [query, setQuery] = useState('');

  const options = exampleProjects.map((exampleProject) => ({
    id: exampleProject.id,
    text: `${exampleProject.name} (${exampleProject.client})`,
  }));

  const getOptions: UseBookingToProjectProps['getOptions'] = async (searchQuery) => {
    const searchText = searchQuery.toLowerCase();
    const filteredResults = options.filter(({ text }) => text.toLocaleLowerCase().includes(searchText));

    return {
      results: filteredResults,
      clientSideFiltering: true,
    };
  };

  const onValueChange: UseBookingToProjectProps['onValueChange'] = (newValue) => {
    if (newValue) {
      // TODO: POST selected project to API / TimeTrackingProject
      // https://developers.hrworks.de/docs/hrworks-api-v2/daa98ff0d69cd-time-tracking-project
      setValue(newValue);
    }
  };

  const onQueryChange: UseBookingToProjectProps['onQueryChange'] = (newQuery) => {
    setQuery(newQuery);
    setValue(null);
  };

  return {
    value,
    query,
    getOptions,
    onValueChange,
    onQueryChange,
  };
};
