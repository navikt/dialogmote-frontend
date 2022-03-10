import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import GamleReferat from "@/common/components/referat/GamleReferat";
import SisteReferat from "@/common/components/referat/SisteReferat";
import { FileContent } from "@navikt/ds-icons";
import React, { ReactNode } from "react";
import { Referat } from "@/server/data/types/internal/BrevTypes";

const texts = {
  title: "Referat fra dialogmøte",
};

interface Props {
  referater?: Referat[];
  children?: ReactNode;
}

const ReferaterPanel = ({ referater, children }: Props) => {
  if (referater && referater.length > 0) {
    return (
      <DialogmotePanel title={texts.title} icon={<FileContent />}>
        <SisteReferat referat={referater[0]} />
        <GamleReferat referater={referater.slice(1)} />
        {children}
      </DialogmotePanel>
    );
  }
  return null;
};

export default ReferaterPanel;
