const extractNumberedItems = (text: string) => {
  // Split text into lines
  const lines = text.split('\n');

  // Regular expression to match lines starting with numbers (1., 2., etc.)
  const numberPattern = /^\d+\.\s+(.+)$/;

  // Filter and map to get just the content after the numbers
  return lines
    .filter((line: string) => numberPattern.test(line))
    .map((line: string) => {
      const match = line.match(numberPattern);
      if (!match) return '';
      return match[1].trim();
    });
};

export default extractNumberedItems;
