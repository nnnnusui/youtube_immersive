export const querySelectHtmlElements = (
  selectors: string,
  element: ParentNode = document,
) =>
  Array.from(element.querySelectorAll(selectors))
    .map((it) => it as HTMLElement);

export const querySelectHtmlElementsAsync = (
  selectors: string,
  element: ParentNode = document,
) =>
  new Promise<HTMLElement[]>((resolve) => {
    const interval = setInterval(() => {
      const result = querySelectHtmlElements(selectors, element);
      if (result.length === 0) return;
      clearInterval(interval);
      resolve(result);
    });
  });
