import fetch from 'node-fetch';
import { SourceMapConsumer } from 'source-map';

async function transformStackTrace(errorStackTrace) {
  const lines = errorStackTrace.split('\n');
  const processedStackTrace = [...lines];

  await Promise.all(
    lines.slice(1).map(async (line, i) => {
      const match = line.match(/at\s+(\S+)\s+\((\S+):(\d+):(\d+)\)$/);

      if (match) {
        try {
          const response = await fetch(`${match[2]}.map`);
          if (response.ok) {
            const sourceMapFile = await response.json();
            const consumer = new SourceMapConsumer(sourceMapFile);
            const originalPosition = consumer.originalPositionFor({
              line: Number.parseInt(match[3], 10),
              column: Number.parseInt(match[4], 10),
            });

            if (originalPosition.source) {
              const processedLine = `at ${match[1]} (${originalPosition.source}:${originalPosition.line}:${originalPosition.column})`;
              processedStackTrace[i + 1] = processedLine;
            }
          } else {
            throw new Error('File fetch failed');
          }
        } catch (error) {
          console.error('Error fetching source map file:', error);
        }
      }
    }),
  );

  return processedStackTrace.join('\n');
}

export default transformStackTrace;
