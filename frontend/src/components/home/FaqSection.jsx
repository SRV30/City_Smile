import { useState } from 'react';

const FaqSection = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs.length) return null;

  return (
    <section className="bg-blue-50/70 py-12 lg:py-16">
      <div className="container max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">FAQ</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => (
            <article key={faq.question} className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
              <button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-extrabold text-slate-950">
                {faq.question}<span className="text-blue-600">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
