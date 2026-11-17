import { Palette, Type, Heart } from "lucide-react";

const values = ["Integrity", "Innovation", "Excellence", "Teamwork", "Customer Focus"];

function Card({
  icon,
  title,
  children,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-6 py-7 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-orange-500 ring-1 ring-slate-100">
        {icon}
      </div>

      <h3 className="text-center lg:text-[26px] text-lg font-bold tracking-tight text-slate-800">
        {title}
      </h3>

      <div className="mt-5">{children}</div>

      <p className="mt-5 text-center text-base text-slate-500">{subtitle}</p>
    </div>
  );
}

export default function RecognitionBrandingSection() {
  return (
    <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-[#123f67]">
            Your Culture. Your Brand. Your
            <span className="block">Recognition.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Customize logos, colors, and values to ensure every recognition reflects
            your organization&apos;s identity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Card
            icon={<Palette className="h-5 w-5" strokeWidth={2.2} />}
            title="Brand Colors"
            subtitle="Match your brand palette"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="h-12 w-12 rounded-lg bg-[#ff7a1a] shadow-sm" />
              <div className="h-12 w-12 rounded-lg bg-[#f5b700] shadow-sm" />
              <div className="h-12 w-12 rounded-lg bg-[#18a64a] shadow-sm" />
            </div>
          </Card>

          <Card
            icon={<Type className="h-5 w-5" strokeWidth={2.2} />}
            title="Company Logo"
            subtitle="Display your organization's logo"
          >
            <div className="mx-auto flex h-[86px] max-w-[260px] items-center justify-center rounded-xl bg-white px-4 shadow-[inset_0_0_0_1px_rgba(226,232,240,0.8)]">
              <span className="text-4xl font-extrabold tracking-tight text-[#ff741f] sm:text-[46px]">
                Elara
              </span>
            </div>
          </Card>

          <Card
            icon={<Heart className="h-5 w-5" strokeWidth={2.2} />}
            title="Custom Values"
            subtitle="Align with your company values"
          >
            <div className="mx-auto max-w-[285px] rounded-xl bg-white px-3 py-3 shadow-[inset_0_0_0_1px_rgba(226,232,240,0.8)]">
              <div className="mb-3 text-center text-sm font-semibold text-[#224a7f] sm:text-[15px]">
                Company Values <span className="font-normal text-slate-400">(Optional)</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#224a7f] shadow-sm"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
