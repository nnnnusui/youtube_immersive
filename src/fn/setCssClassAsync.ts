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
