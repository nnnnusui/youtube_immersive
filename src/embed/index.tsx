import { render } from "solid-js/web";

import { Overlay } from "@/component/Overlay";
import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { manifest } from "@/manifest";

console.log(`${manifest.name}: loaded.`);
querySelectHtmlElementsAsync("ytd-app")
  .then(([it]) => render(() => <Overlay />, it));
