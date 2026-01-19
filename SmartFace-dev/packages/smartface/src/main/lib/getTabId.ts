export const getTabId = (): string => {
  const TAB_ID_KEY = 'tab-id';

  let tabId = sessionStorage.getItem(TAB_ID_KEY);

  if (!tabId || !window.name) {
    tabId = crypto.randomUUID();
    sessionStorage.setItem(TAB_ID_KEY, tabId);
    window.name = tabId;
  }

  return tabId;
};
