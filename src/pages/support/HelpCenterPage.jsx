import { Link } from "react-router-dom";
import {
  LifeBuoy,
  MessageCircle,
  Mail,
  Shield,
  BookOpen,
  Bug,
  HelpCircle
} from "lucide-react";

export default function HelpCenterPage() {

  const cards = [

    {
      title: "Create Support Ticket",
      description:
        "Need technical assistance? Create a support ticket.",
      icon: MessageCircle,
      link: "/support/create"
    },

    {
      title: "Frequently Asked Questions",
      description:
        "Answers to the most common questions.",
      icon: HelpCircle,
      link: "/faq"
    },

    {
      title: "Community Guidelines",
      description:
        "Learn how to safely use BLYNK.",
      icon: Shield,
      link: "/legal/community"
    },

    {
      title: "Privacy Policy",
      description:
        "Understand how we protect your data.",
      icon: Shield,
      link: "/legal/privacy"
    },

    {
      title: "Terms of Service",
      description:
        "Read our platform terms.",
      icon: BookOpen,
      link: "/legal/terms"
    },

    {
      title: "Report a Bug",
      description:
        "Found something broken? Tell us.",
      icon: Bug,
      link: "/support/create"
    }

  ];

  return (

    <div className="max-w-7xl mx-auto py-16 px-6">

      <div className="text-center mb-14">

        <LifeBuoy
          size={70}
          className="mx-auto text-blue-600 mb-6"
        />

        <h1 className="text-5xl font-bold">

          Help Center

        </h1>

        <p className="text-gray-600 mt-5 max-w-3xl mx-auto">

          Welcome to the BLYNK Help Center.
          Find answers, report problems,
          contact support and learn how to
          use every feature of the platform.

        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {cards.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.title}
              to={item.link}
              className="border rounded-2xl p-8 hover:shadow-xl transition bg-white"
            >

              <Icon
                size={40}
                className="text-blue-600 mb-5"
              />

              <h2 className="text-2xl font-bold">

                {item.title}

              </h2>

              <p className="text-gray-600 mt-3">

                {item.description}

              </p>

            </Link>

          );

        })}

      </div>

      <div className="mt-16 rounded-2xl bg-blue-600 text-white p-10">

        <h2 className="text-3xl font-bold mb-4">

          Contact Support

        </h2>

        <p className="opacity-90 mb-6">

          Our support team is here to help you with
          technical issues, billing questions,
          account recovery and business inquiries.

        </p>

        <div className="flex flex-wrap gap-6">

          <div className="flex items-center gap-3">

            <Mail size={22} />

            support@blynk.africa

          </div>

          <div className="flex items-center gap-3">

            <MessageCircle size={22} />

            Live Chat Coming Soon

          </div>

        </div>

      </div>

    </div>

  );

}