/** copies value to clipboard */
export const copyToClipboard = (value?: string) => {
  if (value) navigator.clipboard.writeText(value);
};

/** Opens url in new tab */
export const openNewTab = (url: string) => {
  window.open(url, "name", "noopener=yes");
};
