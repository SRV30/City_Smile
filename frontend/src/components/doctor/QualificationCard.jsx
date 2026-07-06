const QualificationCard = ({ qualification, index }) => (
  <article className="relative rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
    <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-600 text-lg font-extrabold text-white">{index + 1}</div>
    <h3 className="mt-5 text-lg font-extrabold text-slate-950">{qualification}</h3>
  </article>
);

export default QualificationCard;
