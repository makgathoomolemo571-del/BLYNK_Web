import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  DollarSign,
  BarChart3,
  CreditCard,
  Users,
  Gift,
  Star,
  BadgeDollarSign,
  HandCoins,
  BriefcaseBusiness,
  Settings
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/monetization"
  },
  {
    title: "Wallet",
    icon: Wallet,
    path: "/monetization/wallet"
  },
  {
    title: "Earnings",
    icon: DollarSign,
    path: "/monetization/earnings"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/monetization/analytics"
  },
  {
    title: "Withdraw",
    icon: CreditCard,
    path: "/monetization/payout"
  },
  {
    title: "Subscribers",
    icon: Users,
    path: "/monetization/subscriptions"
  },
  {
    title: "Tips",
    icon: HandCoins,
    path: "/monetization/tips"
  },
  {
    title: "Stars",
    icon: Star,
    path: "/monetization/stars"
  },
  {
    title: "Gifts",
    icon: Gift,
    path: "/monetization/gifts"
  },
  {
    title: "Ad Revenue",
    icon: BadgeDollarSign,
    path: "/monetization/ads"
  },
  {
    title: "Sponsors",
    icon: BriefcaseBusiness,
    path: "/monetization/sponsors"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/monetization/settings"
  }
];

export default function MonetizationSidebar() {

  return (

    <aside className="w-72 bg-white border-r min-h-screen">

      <div className="px-6 py-6 border-b">

        <h2 className="text-2xl font-bold text-purple-700">

          Monetization

        </h2>

        <p className="text-sm text-zinc-500 mt-1">

          Creator Revenue Center

        </p>

      </div>

      <nav className="py-4">

        {menus.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink

              key={item.path}

              to={item.path}

              className={({ isActive }) =>

                `flex items-center gap-4 px-6 py-4 transition

                ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "hover:bg-zinc-100 text-zinc-700"
                }`

              }

            >

              <Icon size={22} />

              <span className="font-medium">

                {item.title}

              </span>

            </NavLink>

          );

        })}

      </nav>

    </aside>

  );

}