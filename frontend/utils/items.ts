import {LayoutGrid,Users,FileText,BookOpen,Clock3} from 'lucide-react'


export const menuItems = [
  {
    label: "Home",
    icon: LayoutGrid,
    tab: "home",
    route: "/dashboard",
  },

  {
    label: "My Groups",
    icon: Users,
    tab: "groups",
    route: "/dashboard",
  },

  {
    label: "Assignments",
    icon: FileText,
    tab: "assignments",
    route: "/dashboard",
  },

  {
    label: "AI Teacher’s Toolkit",
    icon: BookOpen,
    tab: "toolkit",
    route: "/create-assessment",
  },

  {
    label: "My Library",
    icon: Clock3,
    tab: "library",
    route: "/dashboard",
  },
];