const plans = {

FREE_MEMBER: {
  name: "Free Member",
  price: 0,
  currency: "ZAR",
  billing: "monthly"
},

FREE_CREATOR: {
  name: "Free Creator",
  price: 0,
  currency: "ZAR",
  billing: "monthly"
},

FREE_BUSINESS: {
  name: "Free Business",
  price: 0,
  currency: "ZAR",
  billing: "monthly"
},

MEMBER_BASIC: {
  name: "Member Basic",
  price: 49,
  currency: "ZAR",
  billing: "monthly"
},

MEMBER_PLUS: {
  name: "Member Plus",
  price: 99,
  currency: "ZAR",
  billing: "monthly"
},

CREATOR_BASIC: {
  name: "Creator Basic",
  price: 99,
  currency: "ZAR",
  billing: "monthly"
},

CREATOR_PLUS: {
  name: "Creator Plus",
  price: 199,
  currency: "ZAR",
  billing: "monthly"
},

CREATOR_PRO: {
  name: "Creator Pro",
  price: 399,
  currency: "ZAR",
  billing: "monthly"
},

BUSINESS_BASIC: {
  name: "Business Basic",
  price: 199,
  currency: "ZAR",
  billing: "monthly"
},

BUSINESS_PRO: {
  name: "Business Pro",
  price: 499,
  currency: "ZAR",
  billing: "monthly"
},

BUSINESS_ENTERPRISE: {
  name: "Business Enterprise",
  price: 999,
  currency: "ZAR",
  billing: "monthly"
},

// MEMBER TO CREATOR_UPGRADE: {
MEMBER_TO_CREATOR_VIP: {
  name: "Member VIP",
  price: 29,
  currency: "ZAR",
  billing: "monthly"
},
MEMBER_TO_CREATOR_VVIP: {
  name: "Member VVIP",
  price: 59,
  currency: "ZAR",
  billing: "monthly"
},

// MEMBER TO BUSINESS_UPGRADE: {
MEMBER_TO_BUSINESS_VIP: {
  name: "Member VIP",
  price: 49,
  currency: "ZAR",
  billing: "monthly"
},
MEMBER_TO_BUSINESS_VVIP: {
  name: "Member VVIP",
  price: 159,
  currency: "ZAR",
  billing: "monthly"
},

};


export default function LandingPricing() {

  return (

    <section className="w-full py-20 bg-gray-100 text-black text-center">

      <h2 className="text-3xl font-bold">
        Pricing Plans
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-10">

        {plans.map((p, i) => (

          <div key={i} className="p-6 bg-white rounded-xl shadow">

            <h3 className="text-xl font-bold">
              {p.name}
            </h3>

            <p className="text-2xl mt-2">
              {p.price}
            </p>

            <ul className="mt-4 space-y-2">

              {p.features.map((f, j) => (

                <li key={j} className="text-sm text-gray-600">
                  {f}
                </li>

              ))}

            </ul>

          </div>

        ))}

      </div>

    </section>

  );

}