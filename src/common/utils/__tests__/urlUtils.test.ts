import { afterEach, describe, expect, it, vi } from "vitest";
import { loginUser } from "@/common/utils/urlUtils";

describe("loginUser", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("laster siden på nytt når nettleseren gjenoppretter den fra back/forward-cachen", () => {
    const reload = vi.fn();
    vi.stubGlobal("location", {
      href: "",
      pathname: "/syk/dialogmoter/sykmeldt",
      reload,
    });

    loginUser();
    window.dispatchEvent(
      new PageTransitionEvent("pageshow", { persisted: true }),
    );

    expect(reload).toHaveBeenCalledOnce();
  });
});
