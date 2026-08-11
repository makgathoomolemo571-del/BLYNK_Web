import {
  House,
  Clapperboard,
  CirclePlay,
  MessageCircle,
  Bell,
  Store,
  Wallet,
  Mic2,
  BriefcaseBusiness,
  Palette,
  Settings,
  LogOut
} from "lucide-react";

const menu = [
  {
    section: "MAIN",
    items: [
      {
        title: "Home",
        icon: House,
        path: "/feed"
      },
      {
        title: "Reels",
        icon: Clapperboard,
        path: "/reels"
      },
      {
        title: "Stories",
        icon: CirclePlay,
        path: "/stories"
      },
      {
        title: "Messages",
        icon: MessageCircle,
        path: "/messages"
      },
      {
        title: "Notifications",
        icon: Bell,
        path: "/notifications"
      }
    ]
  },

  {
    section: "DISCOVER",
    items: [
      {
        title: "Marketplace",
        icon: Store,
        path: "/marketplace"
      },
      {
        title: "Wallet",
        icon: Wallet,
        path: "/wallet"
      },
      {
        title: "Podcasts",
        icon: Mic2,
        path: "/podcasts"
      }
    ]
  },

  {
    section: "CREATOR",
    items: [
      {
        title: "Business Hub",
        icon: BriefcaseBusiness,
        path: "/business"
      },
      {
        title: "Creator Studio",
        icon: Palette,
        path: "/creator"
      }
    ]
  },

  {
    section: "ACCOUNT",
    items: [
      {
        title: "Settings",
        icon: Settings,
        path: "/settings"
      },
      {
        title: "Logout",
        icon: LogOut,
        path: "/logout"
      }
    ]
  }
];

export default menu;