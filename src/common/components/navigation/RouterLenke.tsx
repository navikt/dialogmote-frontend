import { Events } from "@/common/analytics/events";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import NextLink from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  trackingName: Events;
  children: ReactNode;
}

const RouterLenke = ({ href, trackingName, children }: Props) => {
  const { trackEvent } = useAnalytics();

  return (
    <NextLink href={href}>
      <span className="aksel-link" onClick={() => trackEvent(trackingName)}>
        {children}
      </span>
    </NextLink>
  );
};

export default RouterLenke;
