export default (body) => {
  const { targetId: id, pageEvent: event } = body.backendEventData;
  const tabId = id.charAt(0);
  const itemId = id.charAt(1);

  switch (event) {
    case 'initialSelect':
    case 'select':
      return [
        {
          targetSfId: `text-${itemId}`,
          operation: 'write',
          path: 'props.text',
          value: `TabItem ${itemId} ${event}`,
        },
      ];
    case 'deselect':
      return [
        {
          targetSfId: `footer-text-${tabId}`,
          operation: 'write',
          path: 'props.text',
          value: `TabItem ${itemId} deselected`,
        },
      ];
    case 'button':
      return [{ targetSfId: 'tab-0', operation: 'write', path: 'props.selectedItemSfId', value: `tabItem-${itemId}` }];

    default:
      return [];
  }
};
