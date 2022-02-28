import styled from "styled-components";
import { Label } from "@navikt/ds-react";

export const CapitalizedLabel = styled(Label)`
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
`;
