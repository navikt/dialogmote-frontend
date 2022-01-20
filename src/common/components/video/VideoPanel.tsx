import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { getAsset } from "@/common/utils/getAssetPath";

const texts = {
  title: "Om dialogmøter",
  browserNotSupported: "Nettleseren din støtter ikke denne videoavspillingen.",
  navigateToMovie: "Gå direkte til filmen!",
};

const VideoPanel = () => {
  return (
    <DialogmotePanel title={texts.title}>
      <video
        width="100%"
        height="auto"
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
