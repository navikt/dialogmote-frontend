import { Skeleton, SkeletonProps } from "@navikt/ds-react";
import { PropsWithChildren } from "react";

interface Props {
  displaySkeleton: boolean;
  skeletonProps?: SkeletonProps;
}

export const SkeletonWrapper = ({
  displaySkeleton,
  skeletonProps,
  children,
}: PropsWithChildren<Props>) => {
  if (!displaySkeleton) return <>{children}</>;

  return (
    <Skeleton
      variant="rectangle"
      width="100%"
      className="mb-8"
      {...skeletonProps}
    >
      {children}
    </Skeleton>
  );
};
