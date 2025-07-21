import useUxSignals from "@/common/hooks/useUxSignals";

const UxSignalsPanel = () => {
  useUxSignals(true);

  return (
    <div
      data-uxsignals-embed="panel-hs78z2ahch"
      data-uxsignals-mode="demo"
      style={{ marginBottom: "2rem" }}
    />
  );
};

export default UxSignalsPanel;
