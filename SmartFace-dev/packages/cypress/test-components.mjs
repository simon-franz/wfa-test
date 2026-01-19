export const COMPONENT_GROUPS = [
  // sui-core
  [
    'Accordion',
    'AccordionItem',
    'Alert',
    'Badge',
    'BlankLayout',
    'BlockUI',
    'Breadcrumb',
    'BreadcrumbItem',
    'Button',
    'Card',
    'Checkbox',
    'CheckboxGroup',
    // TODO: Fix slow menu expansion
    // 'CollapsibleMenu',
    'DateField',
    'DecimalField',
    'DropdownMenu',
    'Form',
    'FormGroup',
    'FormText',
    'IconButton',
    'Image',
    'IntegerField',
    'Label',
    'List',
    'LoadingAnimation',
    'PasswordField',
    'Progress',
    'RadioGroup',
    'Section',
    'Select',
    'Switch',
    'Tabs',
    'Text',
    'Textarea',
    'TextField',
    'Title',
    'Tooltip',
    'VisibilityHandler',
  ],
  // sui-extension
  ['BarChart', 'CommentList', 'DataWidget', 'HeaderArea', 'LineChart', 'NestedChecklist', 'Slider', 'CmdTable'],
  // sui-shared
  ['InputField'],
  // error-handling
  ['ServerStatus'],
];

export const TEST_COMPONENTS = COMPONENT_GROUPS.flat();
