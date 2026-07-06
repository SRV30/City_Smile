const SkillCard = ({ skill }) => (
  <div className="rounded-2xl bg-white p-5 text-center font-extrabold text-slate-950 shadow-sm ring-1 ring-slate-100">
    <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">✦</div>
    {skill}
  </div>
);

export default SkillCard;
