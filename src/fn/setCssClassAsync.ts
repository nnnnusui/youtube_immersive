export const setCssClassAsync = (
  cssClass: string,
  promises: Promise<HTMLElement[]>[],
) => {
  promises.forEach(async (promise) =>
    (await promise).forEach((element) => {
      element.classList.add(cssClass);
    })
  );
};

export const usePromisesAsync = <T>(
  callback: (args: T) => void,
  promises: Promise<T[]>[],
) => {
  promises.forEach(async (promise) =>
    (await promise).forEach(callback)
  );
};
