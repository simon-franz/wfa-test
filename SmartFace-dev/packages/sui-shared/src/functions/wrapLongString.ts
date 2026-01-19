export const wrapLongString = (label: string, maxLineLength = 30): string => {
  let wrappedString = '';
  let currentLine = '';

  const words = label.split(' ');

  for (const word of words) {
    if (currentLine.length + word.length + 1 <= maxLineLength) {
      // Append word to the current line
      currentLine += (currentLine.length > 0 ? ' ' : '') + word;
    } else {
      // Handle word splitting
      if (word.length > maxLineLength - 1) {
        if (currentLine.length > 0) {
          wrappedString += currentLine + '<br>';
          currentLine = '';
        }
        let i = 0;
        while (i < word.length) {
          let sliceLength = Math.min(maxLineLength - 1, word.length - i);
          // Ensure at least 4 characters are left after slicing
          if (word.length - i - sliceLength < 4 && word.length - i - sliceLength > 0) {
            sliceLength -= 4 - (word.length - i - sliceLength);
          }
          const slice = word.slice(i, i + sliceLength);
          wrappedString += slice + (i + sliceLength < word.length ? '-<br>' : '');
          i += sliceLength;
        }
        // Add a space or line break if the next word is not the first word
        if (words.indexOf(word) < words.length - 1) {
          wrappedString += '<br>';
        }
      } else {
        wrappedString += currentLine + '<br>';
        currentLine = word;
      }
    }
  }

  if (currentLine.length > 0) {
    wrappedString += currentLine;
  }

  return wrappedString;
};
