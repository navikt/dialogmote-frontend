interface HotjarWindow extends Window {
  hj: (name: string, value: string) => void;
}

export type MotebehovType = "meld" | "svar";

export function triggerMotebehovSubmitHotjar() {
  setTimeout(() => {
    const hotJarWindow = window as unknown as HotjarWindow;

    if (typeof hotJarWindow.hj === "function") {
      hotJarWindow.hj("trigger", `esyfo-dm-motebehov-submit`);
    }
  }, 1000);
}
