const Hero = ({ data }) => {
  if (!data) return null;

  const { heading, subHeading, description, ctaButtons, heroImage, statistics } = data;

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-blue-50 rounded-l-full opacity-50 hidden md:block"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content Left */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-primary font-bold uppercase tracking-wider mb-3 animate-fade-in-down">
              {subHeading}
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {heading}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-12">
              {ctaButtons.map((btn, index) => (
                <a
                  key={index}
                  href={btn.link}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    btn.variant === 'primary'
                      ? 'bg-primary text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {btn.text}
                </a>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-gray-100">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Right */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src={heroImage}
                alt="Clinic Interior"
                className="w-full h-auto object-cover min-h-[400px]"
              />
            </div>
            {/* Floating Card Decoration */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Certified Clinic</div>
                  <div className="text-sm text-gray-500">ISO 9001:2015 Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
