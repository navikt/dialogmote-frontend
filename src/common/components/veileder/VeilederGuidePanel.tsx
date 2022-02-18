import { getAsset } from "@/common/utils/getAssetPath";
import { GuidePanel } from "@navikt/ds-react";
import Image from "next/image";
import { ReactNode } from "react";
import styled from "styled-components";

const GuidePanelStyled = styled(GuidePanel)`
  margin-bottom: 2rem;
`;
interface Props {
  children?: ReactNode;
}

const VeilederGuidePanel = ({ children }: Props) => {
  return (
    <GuidePanelStyled
      illustration={
        <Image
          src={getAsset("/veileder/veileder-avatar.svg")}
          layout="fill"
          alt={""}
        />
      }
    >
      {children}
    </GuidePanelStyled>
  );
};

export default VeilederGuidePanel;
