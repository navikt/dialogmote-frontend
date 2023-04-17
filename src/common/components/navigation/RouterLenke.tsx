import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import NextLink from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  trackingName: Events;
  children: ReactNode;
}

const RouterLenke = ({ href, trackingName, children }: Props) => {
  const { trackEvent } = useAmplitude();

  return (
    <NextLink href={href}>
      <span className="navds-link" onClick={() => trackEvent(trackingName)}>
        {children}
      </span>
    </NextLink>
  );
};

export default RouterLenke;
