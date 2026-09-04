import { afterEach, describe, expect, it } from "vitest";
import { getDialogmoteApmMetaTags } from "./metaTags";

const originalCluster = process.env.NAIS_CLUSTER_NAME;
const originalRuntimeEnvironment = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT;

const restoreEnv = (name: string, value: string | undefined) => {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
};

describe("APM meta tags", () => {
  afterEach(() => {
    restoreEnv("NAIS_CLUSTER_NAME", originalCluster);
    restoreEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", originalRuntimeEnvironment);
  });

  it("bruker podens Nais-cluster fremfor det grovere build-miljøet", () => {
    process.env.NAIS_CLUSTER_NAME = "dev-gcp";
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";

    expect(getDialogmoteApmMetaTags()).toContainEqual({
      name: "nais-cluster",
      content: "dev-gcp",
    });
  });

  it("sender ikke det grove build-miljøet som Nais-cluster på statiske sider", () => {
    delete process.env.NAIS_CLUSTER_NAME;
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";

    expect(getDialogmoteApmMetaTags()).not.toContainEqual(
      expect.objectContaining({ name: "nais-cluster" }),
    );
  });
});
