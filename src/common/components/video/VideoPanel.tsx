import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { getAsset } from "@/common/utils/getAssetPath";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import { BodyShort } from "@navikt/ds-react";

const texts = {
  title: "En film om dialogmøter",
  info: "Denne filmen gir en kort innføring i hvordan et dialogmøte kan hjelpe deg som er sykmeldt.",
  browserNotSupported: "Nettleseren din støtter ikke denne videoavspillingen.",
  navigateToMovie: "Gå direkte til filmen!",
};

const VideoPanel = () => {
  const { trackEvent } = useAmplitude();

  return (
    <DialogmotePanel title={texts.title}>
      <BodyShort size="medium" spacing>
        {texts.info}
      </BodyShort>
      <video
        width="100%"
        height="auto"
        onPlay={() => trackEvent(Events.SpillerAvDialogmotefilm)}
        controls
        poster={getAsset("/video/poster.jpg")}
      >
        <source src={getAsset("/video/film.mp4")} type="video/mp4" />
        <track
          label="Norsk bokmål"
          kind="captions"
          srcLang="nb"
          src={getAsset("/video/subtitle.vtt")}
          default
        />
        <p>
          {texts.browserNotSupported}{" "}
          <a href={getAsset("/video/film.mp4")}>{texts.navigateToMovie}</a>
        </p>
      </video>
    </DialogmotePanel>
  );
};

export default VideoPanel;
