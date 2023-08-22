import CircledIcon from "@/common/components/icon/CircledIcon";
import { Heading, Panel } from "@navikt/ds-react";
import { HeadingProps } from "@navikt/ds-react/esm/typography/Heading";
import React, { ReactNode } from "react";

interface Props {
  title?: string;
  icon?: ReactNode;
  titleSize?: HeadingProps["size"];
  children: ReactNode;
  className?: string;
}

const DialogmotePanel = ({
  title,
  icon,
  titleSize = "medium",
  className,
  children,
}: Props) => {
  return (
    <Panel className={`mb-8 flex flex-col gap-4 ${className}`} border>
      {(title || icon) && (
        <Heading className="flex items-center gap-4" size={titleSize} level="2">
          {icon && <CircledIcon icon={icon} />}
          {title}
        </Heading>
      )}
      {children}
    </Panel>
  );
};

export default DialogmotePanel;
