import { render } from "solid-js/web";

import { Overlay } from "@/component/Overlay";
import { manifest } from "@/manifest";


console.log(`${manifest.name}: loaded.`);
// masthead-container

render(() => <Overlay />, document.querySelector("ytd-app")!);
