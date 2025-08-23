/**
 * Copy text content to clipboard as plain text
 * @param textContent
 */
export const copyAsPlainText = (textContent: string) => {
  navigator.clipboard
    .writeText(textContent)
    .then(() => {
      console.log('Text copied to clipboard!');
    })
    .catch((err) => {
      console.error('Failed to copy text:', err);
    });
};
