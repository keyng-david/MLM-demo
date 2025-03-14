import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "ReferralTree completely transformed how I manage my MLM business. The binary tree visualization makes it so easy to see my entire network at a glance, and the crypto staking feature has added a whole new revenue stream.",
    author: "Sarah Johnson",
    role: "Diamond Partner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    stars: 5,
  },
  {
    quote:
      "I've tried several MLM software solutions, but nothing comes close to ReferralTree. The team balancing tools alone have increased my commission by 32% in just three months.",
    author: "Michael Chen",
    role: "Executive Director",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    stars: 5,
  },
  {
    quote:
      "The crypto staking feature is a game-changer. I'm earning passive income on my commissions while I sleep, and the 15% APY is better than any traditional investment option I've found.",
    author: "Jessica Williams",
    role: "Gold Partner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
    stars: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Loved by Network Marketers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;