import styled from "styled-components";
import Veileder from "nav-frontend-veileder";
import { ReactElement } from "react";
import Image from "next/image";
import veilederAvatar from "../../public/images/veileder-avatar.svg";

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin: 64px 0;
`;

interface Props {
  content: ReactElement;
}

function VeilederSpeechBubble({ content }: Props) {
  return (
    <VeilederStyled
      tekst={content}
      posisjon="høyre"
      storrelse="S"
      fargetema="info"
      hvitSnakkeboble
    >
      <Image
        src={veilederAvatar}
        alt="Veileder avatar"
        width={72}
        height={72}
      />
    </VeilederStyled>
  );
}

export default VeilederSpeechBubble;
