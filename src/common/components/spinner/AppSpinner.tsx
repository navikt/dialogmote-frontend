import { Loader } from "@navikt/ds-react";
import React, { ReactElement } from "react";

const AppSpinner = (): ReactElement => {
  return (
    <div className="text-center mt-16 mb-16">
      <Loader
        variant="neutral"
        size="2xlarge"
        title="Vent litt mens siden laster"
      />
    </div>
  );
};

export default AppSpinner;
