import { IconApology } from "@/components/icons/IconApology";
import { IconGiving } from "@/components/icons/IconGiving";
import { IconLater } from "@/components/icons/IconLater";
import { IconSupport } from "@/components/icons/IconSupport";
import type { SceneIconName } from "@/content";

const icons = {
  giving: IconGiving,
  support: IconSupport,
  apology: IconApology,
  later: IconLater,
};

export function SceneIcon({ name }: { name: SceneIconName }) {
  const Icon = icons[name];
  return <Icon className="h-8 w-8 text-accent" />;
}
