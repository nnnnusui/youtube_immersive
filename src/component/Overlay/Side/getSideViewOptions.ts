import { SideViewOption } from "./VisibilitySwitchOption/SideViewOption";

type PartialSideViewOption =
  Partial<SideViewOption>
  & Pick<SideViewOption, "target">
export const getSideViewOptions = (raw: Record<string, string | PartialSideViewOption>) => {
  const defaultsApplied = (partial: PartialSideViewOption): SideViewOption => ({
    mustExist: partial?.mustExist?.replace(":scope", partial.target) ?? "html",
    ...partial,
  });
  return Object.fromEntries(
    Object.entries(raw)
      .map(([key, rawValue]) => {
        const value
          = typeof rawValue === "string"
            ? { target: rawValue }
            : rawValue;
        return [key, defaultsApplied(value)];
      })
  );
};
