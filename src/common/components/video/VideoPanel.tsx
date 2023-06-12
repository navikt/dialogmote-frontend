import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import { BodyShort } from "@navikt/ds-react";
import { getPublicAsset } from "@/common/utils/getAssetPath";

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
        crossOrigin="anonymous"
        poster={getPublicAsset("/video/poster.jpg")}
      >
        <source src={getPublicAsset("/video/film.mp4")} type="video/mp4" />
        <track
          label="Norsk bokmål"
          kind="captions"
          srcLang="nb"
          src={getPublicAsset("/video/subtitle.vtt")}
          default
        />
        <p>
          {texts.browserNotSupported}{" "}
          <a href={getPublicAsset("/video/film.mp4")}>
            {texts.navigateToMovie}
          </a>
        </p>
      </video>
    </DialogmotePanel>
  );
};

export default VideoPanel;
