import { IconType } from "react-icons";
import {
  FiBell,
  FiList,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { MdAddTask } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

interface LinkItemProps {
  name: string;
  href: string;
  icon: IconType;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", href: "/dashboard", icon: RxDashboard },
  { name: "Posts", href: "/posts", icon: FiList },
  { name: "Task List", href: "/tasklist", icon: MdAddTask },
  { name: "Trending", href: "/trending", icon: FiTrendingUp },
  { name: "Favourites", href: "/favourites", icon: FiStar },
  { name: "Notifications", href: "/notifications", icon: FiBell },
  { name: "Settings", href: "/settings", icon: FiSettings },
];
