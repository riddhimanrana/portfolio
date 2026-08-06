import type { SVGProps } from "react";
import { siDiscord, siGithub, siYoutube } from "simple-icons";

type BrandIconProps = SVGProps<SVGSVGElement>;

function BrandIcon({
  path,
  ...props
}: BrandIconProps & {
  path: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d={path} />
    </svg>
  );
}

export function GitHubIcon(props: BrandIconProps) {
  return <BrandIcon path={siGithub.path} {...props} />;
}

export function YouTubeIcon(props: BrandIconProps) {
  return <BrandIcon path={siYoutube.path} {...props} />;
}

export function DiscordIcon(props: BrandIconProps) {
  return <BrandIcon path={siDiscord.path} {...props} />;
}

// LinkedIn is no longer distributed by Simple Icons, so its official mark is
// kept locally while sharing the same renderer as the packaged brand icons.
export function LinkedInIcon(props: BrandIconProps) {
  return (
    <BrandIcon
      path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.475-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9H7.12v11.452Z"
      {...props}
    />
  );
}
