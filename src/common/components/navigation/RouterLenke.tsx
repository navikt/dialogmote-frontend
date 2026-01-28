import NextLink from "next/link";
import type { ReactNode } from "react";
import type { Events } from "@/common/analytics/events";
import { useAnalytics } from "@/common/hooks/useAnalytics";

interface Props {
  href: string;
  trackingName: Events;
  children: ReactNode;
}

const RouterLenke = ({ href, trackingName, children }: Props) => {
  const { trackEvent } = useAnalytics();

  return (
    <NextLink
      href={href}
      className="aksel-link"
      onClick={() => trackEvent(trackingName)}
    >
      {children}
    </NextLink>
  );
};

export default RouterLenke;
