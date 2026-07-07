import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import { Button, Card, Loader, ErrorState } from "../components/UI";
import { fetchServiceBySlug } from "../services/content.service";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchServiceBySlug(slug);
        setService(data);
      } catch (err) {
        setError(err.message || "Unable to load service");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <ErrorState title="Service not available" description={error} />
      </div>
    );
  }

  const fallback = {
    title: slug?.replace(/-/g, " ") || "Service",
    description: "Detailed treatment information will be shown here.",
  };

  const current = service || fallback;

  return (
    <>
      <Seo
        title={`${current.title} | City Smile`}
        description={current.description}
      />
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              Service Detail
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-5xl">
              {current.title}
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {current.description}
            </p>
            <div className="mt-8">
              <Button as={Link} to="/#contact">
                Book Appointment
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
