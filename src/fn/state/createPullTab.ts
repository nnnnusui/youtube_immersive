import {
  createSignal,
} from "solid-js";

type PullTab = {
  focus: () => void,
  unFocus: () => void,
  isShown: boolean
  props: {
    onPointerEnter: () => void
  }
  detector: {
    standby: boolean
    props: {
      onPointerEnter: () => void
    }
  }
  target: {
    isShown: boolean
    focused: boolean
    props: {
      onClick: () => void
    }
  }
}
export const createPullTab = (targetRefs: (() => (HTMLElement | undefined))[]): PullTab => {
  const [standby, setStandby] = createSignal(true);
  const [showPullTab, setShowPullTab] = createSignal(false);
  const [showPullTarget, setShowPullTarget] = createSignal(false);
  const [targetFocused, setTargetFocused] = createSignal(false);
  const cancel = () => {
    if (showPullTarget()) return;
    setStandby(true);
    setShowPullTab(false);
  };
  const ready = () => {
    setStandby(false);
    setShowPullTab(true);
    setTimeout(cancel, 2500);
  };
  const pull = () => {
    setShowPullTab(false);
    setShowPullTarget(true);
    // set leave event
    const onPointerMove = (event: PointerEvent) => {
      if (targetFocused()) return;
      const onInnerTarget
        = targetRefs.find((ref) => ref()?.contains(event.target as HTMLElement));
      if (onInnerTarget) return;
      document.removeEventListener("pointermove", onPointerMove);
      setStandby(true);
      setShowPullTab(false);
      setShowPullTarget(false);
    };
    document.addEventListener("pointermove", onPointerMove);
  };
  const unFocus = () => {
    setTargetFocused(false);
    setStandby(true);
    setShowPullTab(false);
    setShowPullTarget(false);
  };
  const focus = () => {
    setTargetFocused(true);
    // set unfocus event
    const onClickGlobal = (event: MouseEvent) => {
      const onInnerTarget
        = targetRefs.find((ref) => ref()?.contains(event.target as HTMLElement));
      if (onInnerTarget) return;
      unFocus();
      document.removeEventListener("click", onClickGlobal);
    };
    document.addEventListener("click", onClickGlobal);
  };

  return {
    focus,
    unFocus,
    get isShown() { return showPullTab(); },
    props: {
      onPointerEnter: pull,
    },
    detector: {
      get standby() { return standby(); },
      props: {
        onPointerEnter: ready,
      },
    },
    target: {
      get isShown() { return showPullTarget(); },
      get focused() { return targetFocused(); },
      props: {
        onClick: focus,
      },
    },
  };
};
