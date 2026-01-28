import CircledIcon from "@/common/components/icon/CircledIcon";
import { Box, Heading, HeadingProps } from "@navikt/ds-react";
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
    <Box
      className={`mb-8 flex flex-col gap-4 ${className ?? ""}`}
      borderWidth="1"
      borderColor="neutral-subtle"
      borderRadius="8"
      background="raised"
      padding="space-16"
    >
      {(title || icon) && (
        <Heading className="flex items-center gap-4" size={titleSize} level="2">
          {icon && <CircledIcon icon={icon} />}
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
};

export default DialogmotePanel;
