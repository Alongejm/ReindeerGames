import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// --- CONFIG ---
const EVENT_START = new Date("December 20, 2025 09:00:00"); // Tournament kickoff (ET)

// Tiny helper for cx
const cx = (...classes) => classes.filter(Boolean).join(" ");

// Decorative Christmas Lights (SVG)
const ChristmasLights = () => (
  <svg
    viewBox="0 0 1200 100"
    className="w-full h-16 md:h-20"
    role="img"
    aria-label="Decorative Christmas lights"
  >
    <path
      d="M0,40 C150,100 300,-20 450,40 C600,100 750,-20 900,40 C1050,100 1200,-20 1350,40"
      stroke="#35694f"
      strokeWidth="6"
      fill="transparent"
    />
    {Array.from({ length: 24 }).map((_, i) => {
      const x = 25 + i * 50;
      const y = 40 + (i % 2 === 0 ? 18 : -10);
      return (
        <g key={i}>
          <line x1={x} y1={40} x2={x} y2={y} stroke="#35694f" strokeWidth="4" />
          <circle
            cx={x}
            cy={y}
            r="10"
            className={cx(
              "animate-pulse",
              i % 3 === 0 ? "fill-red-500" : i % 3 === 1 ? "fill-amber-400" : "fill-cyan-400"
            )}
          />
        </g>
      );
    })}
  </svg>
);

// Simple Snowfall using CSS keyframes
const Snow = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    {Array.from({ length: 80 }).map((_, i) => (
      <div
        key={i}
        className="absolute top-[-10%] w-2 h-2 bg-white/90 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          animation: `fall ${6 + Math.random() * 8}s linear ${Math.random() * 8}s infinite`,
          opacity: 0.9,
          boxShadow: "0 0 6px rgba(255,255,255,0.9)",
        }}
      />
    ))}
    <style>{`
      @keyframes fall {
        0% { transform: translateY(-10vh); opacity: 0.9; }
        100% { transform: translateY(120vh); opacity: 0.9; }
      }
    `}</style>
  </div>
);

// Simple Reindeer icon with lacrosse stick (SVG)
const ReindeerIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 120"
    role="img"
    aria-label="Reindeer with lacrosse stick"
    className={className}
  >
    <circle cx="60" cy="70" r="28" fill="#b5651d" />
    <circle cx="50" cy="64" r="6" fill="#3b2f2f" />
    <circle cx="70" cy="64" r="6" fill="#3b2f2f" />
    <circle cx="60" cy="82" r="5" fill="#d13b3b" />
    <path d="M40 32 C30 12, 50 12, 40 32" stroke="#6b4226" strokeWidth="6" fill="none" />
    <path d="M80 32 C90 12, 70 12, 80 32" stroke="#6b4226" strokeWidth="6" fill="none" />
    {/* Stick */}
    <rect x="78" y="65" width="6" height="45" rx="2" fill="#824b2c" />
    <path d="M84 56 c14 -3 22 6 20 16 c-1 7 -9 12 -20 12" fill="none" stroke="#824b2c" strokeWidth="6" />
    <path d="M104 70 a10 8 0 1 1 -20 0 a10 8 0 1 1 20 0" fill="none" stroke="#2e6b3e" strokeWidth="3" />
  </svg>
);

// Gingerbread player (SVG)
const GingerbreadPlayer = ({ className = "" }) => (
  <svg viewBox="0 0 120 120" role="img" aria-label="Gingerbread player" className={className}>
    <circle cx="60" cy="30" r="16" fill="#b5651d" />
    <circle cx="55" cy="28" r="3" fill="#fff" />
    <circle cx="65" cy="28" r="3" fill="#fff" />
    <path d="M54 34 q6 6 12 0" stroke="#fff" strokeWidth="3" fill="none" />
    <rect x="36" y="46" width="48" height="36" rx="18" fill="#b5651d" />
    <circle cx="52" cy="64" r="4" fill="#d13b3b" />
    <circle cx="68" cy="64" r="4" fill="#2e6b3e" />
    {/* arms + lacrosse stick */}
    <path d="M36 58 q-10 -6 -18 0" stroke="#b5651d" strokeWidth="8" fill="none" />
    <path d="M84 58 q10 -6 18 0" stroke="#b5651d" strokeWidth="8" fill="none" />
    <rect x="86" y="42" width="5" height="34" rx="2" fill="#824b2c" />
    <path d="M91 40 c12 -4 20 6 18 14 c-1 6 -8 10 -18 10" fill="none" stroke="#824b2c" strokeWidth="5" />
    <path d="M109 53 a8 7 0 1 1 -16 0 a8 7 0 1 1 16 0" fill="none" stroke="#2e6b3e" strokeWidth="3" />
  </svg>
);

function useCountdown(targetDate: Date) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, diff };
}

const StatCard = ({ label, value }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 text-center">
    <div className="text-3xl md:text-4xl font-extrabold text-emerald-800">{value}</div>
    <div className="text-xs md:text-sm uppercase tracking-wider text-emerald-900/70">{label}</div>
  </div>
);

const NavLink = ({ children }) => (
  <a href={`#${String(children).toLowerCase()}`} className="px-3 py-2 rounded-lg hover:bg-white/20 transition">
    {children}
  </a>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-emerald-900 flex items-center gap-3">
          <span className="inline-flex -mt-1"><ReindeerIcon className="w-10 h-10" /></span>
          {title}
        </h2>
        {subtitle && <p className="text-emerald-900/80 mt-2 md:text-lg">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

const TeamCard = ({ name = "Team Name", division = "8U", seed = 1 }) => (
  <motion.div whileHover={{ scale: 1.03 }} className="group bg-white rounded-2xl p-5 shadow hover:shadow-lg transition border border-emerald-900/10">
    <div className="flex items-center gap-4">
      <div className="rounded-xl p-3 border bg-gradient-to-br from-red-50 to-emerald-50">
        <ReindeerIcon className="w-14 h-14" />
      </div>
      <div className="flex-1">
        <h3 className="font-black text-emerald-900">{name}</h3>
        <p className="text-sm text-emerald-900/70">Division {division}</p>
      </div>
      <div className="text-xs bg-emerald-800 text-white px-3 py-1 rounded-full">Seed {seed}</div>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm">
      <a href="#" className="text-emerald-800 font-semibold group-hover:underline">View Roster</a>
      <button className="px-3 py-2 rounded-xl border border-emerald-900/20 hover:bg-emerald-50">Scout</button>
    </div>
  </motion.div>
);

const TicketCard = () => (
  <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-900/10 overflow-hidden">
    <div className="absolute -right-14 -top-14 w-44 h-44 rounded-full bg-red-100" />
    <div className="absolute -left-14 -bottom-14 w-44 h-44 rounded-full bg-emerald-100" />
    <div className="relative">
      <h3 className="text-2xl font-black text-emerald-900">Gift-Tag Tickets 🎁</h3>
      <p className="text-emerald-900/70 mt-1">Give the gift of fast breaks & festive vibes.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border p-4 bg-emerald-50/30">
          <div className="font-bold text-emerald-900">Single Day</div>
          <div className="text-3xl font-black">$12</div>
          <div className="text-xs text-emerald-900/70">Any tournament day</div>
        </div>
        <div className="rounded-xl border p-4 bg-red-50/30">
          <div className="font-bold text-emerald-900">Weekend Pass</div>
          <div className="text-3xl font-black">$30</div>
          <div className="text-xs text-emerald-900/70">All games, all weekend</div>
        </div>
        <div className="rounded-xl border p-4 bg-amber-50/40">
          <div className="font-bold text-emerald-900">Family Pack</div>
          <div className="text-3xl font-black">$45</div>
          <div className="text-xs text-emerald-900/70">Up to 5 guests</div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-700 text-white font-bold hover:bg-emerald-800">
          Buy Tickets
        </a>
        <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-emerald-900/20 hover:bg-emerald-50 font-bold text-emerald-900">
          Group Sales
        </a>
      </div>
    </div>
  </div>
);

const ScheduleAdvent = () => {
  const days = useMemo(() => {
    // Minimal sample schedule for three days
    return [
      {
        date: "Fri, Dec 20",
        games: [
          { time: "9:00 AM", matchup: "Dasher 8U vs Comet 8U", field: "Field 1" },
          { time: "10:30 AM", matchup: "Cupid 10U vs Blitzen 10U", field: "Field 2" },
          { time: "12:00 PM", matchup: "Prancer 12U vs Vixen 12U", field: "Field 3" },
        ],
      },
      {
        date: "Sat, Dec 21",
        games: [
          { time: "9:00 AM", matchup: "Rudolph 8U vs Donner 8U", field: "Field 1" },
          { time: "11:00 AM", matchup: "Snowmen 10U vs Elves 10U", field: "Field 2" },
          { time: "2:00 PM", matchup: "Ginger 12U vs Cocoa 12U", field: "Field 1" },
        ],
      },
      {
        date: "Sun, Dec 22",
        games: [
          { time: "9:30 AM", matchup: "Semi-Final A", field: "Field 1" },
          { time: "11:00 AM", matchup: "Semi-Final B", field: "Field 1" },
          { time: "1:30 PM", matchup: "Championship", field: "Field 1" },
        ],
      },
    ];
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {days.map((d, idx) => (
        <div key={idx} className="rounded-3xl border bg-white shadow-sm overflow-hidden">
          <div className="bg-emerald-700 text-white px-5 py-3 font-black flex items-center justify-between">
            <span>{d.date}</span>
            <span className="text-xs bg-white/20 rounded-full px-2 py-1">Advent {idx + 1}</span>
          </div>
          <ul className="p-5 space-y-3">
            {d.games.map((g, gi) => (
              <li key={gi} className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">{g.time}</div>
                  <div className="text-emerald-900/80 text-sm">{g.matchup}</div>
                </div>
                <div className="text-xs bg-emerald-100 text-emerald-900 px-2 py-1 rounded">{g.field}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default function ReindeerGamesSite() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_START);

  const teams = [
    { name: "Rudolph Runners", division: "8U", seed: 1 },
    { name: "Blitzen Blazers", division: "10U", seed: 2 },
    { name: "Vixen Vipers", division: "12U", seed: 3 },
    { name: "Comet Cutters", division: "8U", seed: 4 },
    { name: "Cupid Crushers", division: "10U", seed: 5 },
    { name: "Prancer Panthers", division: "12U", seed: 6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A7D8F2] via-[#FAFAF8] to-[#FAFAF8] text-emerald-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-emerald-900/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <ReindeerIcon className="w-10 h-10" />
            <div>
              <div className="font-black leading-none text-xl">The Reindeer Games</div>
              <div className="text-xs uppercase tracking-widest text-emerald-900/70">Holiday Lacrosse Tournament</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
            <NavLink>About</NavLink>
            <NavLink>Teams</NavLink>
            <NavLink>Schedule</NavLink>
            <NavLink>Tickets</NavLink>
            <NavLink>Contact</NavLink>
          </nav>
          <a href="#tickets" className="ml-4 inline-flex items-center px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800">
            Buy Tickets
          </a>
        </div>
        <div className="bg-emerald-800/10">
          <ChristmasLights />
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <Snow />
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-20 md:pb-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                The Reindeer Games
                <span className="block text-emerald-800">Holiday Lacrosse Tournament</span>
              </h1>
              <p className="mt-4 md:mt-6 text-emerald-900/80 md:text-lg">
                Snowy sidelines. Twinkling lights. Fast breaks. Celebrate the season with
                a festive, family-friendly tourney featuring divisions from 8U to 12U.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#register" className="px-5 py-3 rounded-2xl bg-emerald-700 text-white font-bold hover:bg-emerald-800">Register Your Team</a>
                <a href="#schedule" className="px-5 py-3 rounded-2xl border border-emerald-900/20 hover:bg-emerald-50 font-bold">View Schedule</a>
              </div>
              <div className="mt-8 grid grid-cols-4 gap-3 max-w-md">
                <StatCard label="Days" value={days} />
                <StatCard label="Hours" value={hours} />
                <StatCard label="Minutes" value={minutes} />
                <StatCard label="Seconds" value={seconds} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="relative rounded-3xl p-6 md:p-10 bg-white/80 backdrop-blur border shadow-lg">
                <div className="absolute -right-6 -top-6 rotate-12">
                  <div className="rounded-2xl border-4 border-dashed border-red-300 p-2">
                    <GingerbreadPlayer className="w-28 h-28" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-50 to-red-50 border">
                    <ReindeerIcon className="w-24 h-24" />
                  </div>
                  <div>
                    <div className="font-black text-2xl">Winter Classic Weekend</div>
                    <div className="text-emerald-900/80">December 20–22, 2025 • North Pole Fields*</div>
                    <div className="text-xs text-emerald-900/60 mt-1">*Okay, not literally—but it will feel like it ❄️</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About the Tournament" subtitle="Where holiday magic meets the crease">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <p className="text-emerald-900/80 md:text-lg">
              The Reindeer Games is a three-day holiday lacrosse celebration featuring
              youth divisions, themed fan zones, festive concessions (hot cocoa FTW), and
              community giveaways. Sportsmanship and seasonal joy are our MVPs.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-emerald-900/90">
              <li className="flex items-center gap-2"><span className="text-xl">🦌</span> Reindeer-themed skills challenge</li>
              <li className="flex items-center gap-2"><span className="text-xl">🥍</span> Candy-cane shooting accuracy</li>
              <li className="flex items-center gap-2"><span className="text-xl">🍪</span> Gingerbread jersey contest</li>
              <li className="flex items-center gap-2"><span className="text-xl">🎄</span> Tree-lighting & carols on Saturday</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-6">
              <GingerbreadPlayer className="w-28 h-28" />
              <GingerbreadPlayer className="w-28 h-28" />
              <ReindeerIcon className="w-28 h-28" />
              <ReindeerIcon className="w-28 h-28" />
            </div>
          </div>
        </div>
      </Section>

      {/* Teams */}
      <Section id="teams" title="Teams" subtitle="Candy-cane borders. Snowflake sparkles. Game on.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map((t, i) => (
            <TeamCard key={i} name={t.name} division={t.division} seed={t.seed} />
          ))}
        </div>
      </Section>

      {/* Schedule */}
      <Section id="schedule" title="Schedule" subtitle="An advent calendar of lacrosse joy">
        <ScheduleAdvent />
      </Section>

      {/* Tickets */}
      <Section id="tickets" title="Tickets" subtitle="Styled like a holiday gift tag—because they are">
        <TicketCard />
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact & Info" subtitle="Questions, group sales, or volunteer opportunities?">
        <div className="grid md:grid-cols-2 gap-6">
          <form className="bg-white rounded-3xl p-6 shadow border border-emerald-900/10">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-semibold">Name</span>
                <input className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="Frosty McFaceoff" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Email</span>
                <input type="email" className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="you@example.com" />
              </label>
            </div>
            <label className="block mt-4">
              <span className="text-sm font-semibold">Message</span>
              <textarea className="mt-1 w-full rounded-xl border px-3 py-2" rows={4} placeholder="Tell us how we can help" />
            </label>
            <button type="button" className="mt-4 px-5 py-3 rounded-2xl bg-emerald-700 text-white font-bold hover:bg-emerald-800">Send</button>
          </form>

          <div className="bg-white rounded-3xl p-6 shadow border border-emerald-900/10">
            <h3 className="text-xl font-black">Venue & Parking</h3>
            <p className="text-emerald-900/80 mt-1">North Pole Fields (example). Free on-site parking. Dress warm!</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border p-4">
                <div className="text-sm text-emerald-900/70">Concessions</div>
                <div className="font-bold">Hot Cocoa • Cider • Snacks</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="text-sm text-emerald-900/70">Pro Shop</div>
                <div className="font-bold">Holiday merch & strings</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="text-sm text-emerald-900/70">Rules</div>
                <div className="font-bold">USL Youth • Mercy rule</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="text-sm text-emerald-900/70">Safety</div>
                <div className="font-bold">Certified trainers on site</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer with skating reindeers */}
      <footer className="relative overflow-hidden mt-10">
        <div className="h-24 bg-gradient-to-t from-white to-emerald-50 border-t border-emerald-900/10 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-sm text-emerald-900/70">© {new Date().getFullYear()} The Reindeer Games • Powered by Holiday Spirit & Lacrosse Love</div>
            <div className="text-xs text-emerald-900/60">Reindeers, snow, lights, and gingerbread graphics are stylized SVGs created for this demo.</div>
          </div>
        </div>
        <div className="absolute bottom-2 left-0 right-0">
          <div className="relative h-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute -bottom-2"
                style={{ left: `${i * 18}%`, animation: `dash ${12 + i * 1.2}s linear ${i * 1}s infinite` }}
              >
                <ReindeerIcon className="w-8 h-8" />
              </div>
            ))}
          </div>
          <style>{`
            @keyframes dash {
              0% { transform: translateX(-10vw); }
              100% { transform: translateX(110vw); }
            }
          `}</style>
        </div>
      </footer>
    </div>
  );
}
