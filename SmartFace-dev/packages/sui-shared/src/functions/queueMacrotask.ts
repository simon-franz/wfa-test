export const queueMacrotask = (task: VoidFunction) => {
  setTimeout(() => {
    task(), 0;
  });
};
