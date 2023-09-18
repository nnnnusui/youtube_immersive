export const usePromisesAsync = <T>(
  callback: (args: T) => void,
  promises: Promise<T[]>[],
) => {
  promises.forEach(async (promise) =>
    (await promise).forEach(callback)
  );
};
