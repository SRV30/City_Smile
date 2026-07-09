import { useState } from "react";

const FAQSection = ({ title, faqs }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-6">
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition"
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm gap-4 hover:bg-slate-50/50"
            >
              <span>{faq.q}</span>
              <span className="text-lg text-slate-400">
                {openFaq === idx ? "−" : "+"}
              </span>
            </button>
            {openFaq === idx && (
              <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3 bg-slate-50/30">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
