const TestimonialSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-slate-200 mb-4" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
        <div className="h-4 w-4/6 rounded bg-slate-200" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-slate-200" />
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-3 w-16 rounded bg-slate-200" />
          </div>
        </div>
        <div className="h-4 w-16 rounded bg-slate-200" />
      </div>
    </div>
  );
};

export default TestimonialSkeleton;
