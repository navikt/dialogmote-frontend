import NextLink from "next/link";
import {ReactNode} from "react";

interface Props {
    href: string;
    children: ReactNode;
}
const Link = ({href, children}: Props) => {
    return <NextLink href={href}>
        <a className="navds-link">{children}</a>
    </NextLink>;
}

export default Link;