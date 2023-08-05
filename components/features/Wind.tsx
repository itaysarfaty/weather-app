// Requirements
// Wind direction

import { getInterCardinalDirection } from "@/utils/getInterCardinalDirection";
import { Navigation } from "@mui/icons-material";
interface WindFeatureProps {
  deg: number;
}

export default function Wind({ deg }: WindFeatureProps) {
  const desc = getInterCardinalDirection(deg);
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
        <Navigation
          style={{
            fontSize: "1rem",
            rotate: `${deg}deg`,
          }}
        />
      </div>
      <h3 className="text-sm">{desc}</h3>
    </div>
  );
}
