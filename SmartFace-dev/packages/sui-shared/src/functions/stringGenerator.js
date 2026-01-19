/** @typedef {'words' | 'sentences' | 'paragraphs'} LoremType */

const LOREM_IPSUM_BASE =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

/**
 * Generates Lorem Ipsum text.
 * @param {LoremType} type - The type of Lorem Ipsum to generate.
 * @param {number} [count=1] - The number of words, sentences, or paragraphs to generate.
 * @returns {string} The generated Lorem Ipsum text.
 */
const generateLorem = (type, count = 1) => {
  const words = LOREM_IPSUM_BASE.split(' ');

  if (type === 'words') {
    return words.slice(0, count).join(' ');
  }

  if (type === 'sentences') {
    const sentences = [];
    const wordsPerSentence = 10;
    for (let i = 0; i < count; i++) {
      const start = (i * wordsPerSentence) % words.length;
      const sentence = words.slice(start, start + wordsPerSentence).join(' ');
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
    }

    return sentences.join(' ');
  }

  if (type === 'paragraphs') {
    const paragraphs = [];
    const sentencesPerParagraph = 5;
    const wordsPerSentence = 10;
    for (let i = 0; i < count; i++) {
      const sentences = [];
      for (let j = 0; j < sentencesPerParagraph; j++) {
        const start = ((i * sentencesPerParagraph + j) * wordsPerSentence) % words.length;
        const sentence = words.slice(start, start + wordsPerSentence).join(' ');
        sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
      }
      paragraphs.push(sentences.join(' '));
    }

    return paragraphs.join('\n\n');
  }

  throw new Error("Type must be 'words', 'sentences', or 'paragraphs'");
};

/**
 * Generates Lorem Ipsum words.
 * @param {number} [wordCount] - The number of words to generate.
 * @returns {string} The generated Lorem Ipsum words.
 */
export const generateLoremWords = (wordCount = 3) => generateLorem('words', wordCount);

/**
 * Generates Lorem Ipsum sentences.
 * @param {number} [sentenceCount] - The number of sentences to generate.
 * @returns {string} The generated Lorem Ipsum sentences.
 */
export const generateLoremSentences = (sentenceCount = 1) => generateLorem('sentences', sentenceCount);

/**
 * Generates Lorem Ipsum paragraphs.
 * @param {number} [paragraphCount] - The number of paragraphs to generate.
 * @returns {string} The generated Lorem Ipsum paragraphs.
 */
export const generateLoremParagraphs = (paragraphCount = 1) => generateLorem('paragraphs', paragraphCount);
