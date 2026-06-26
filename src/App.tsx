import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, Calendar, Mail,
  Facebook, Instagram, MessageCircle, Printer, Activity, ShieldCheck,
  ArrowRight, FileText, Stethoscope, Microscope, Droplet, Beaker, Heart,
  Image as ImageIcon, Lock, FileCheck, Search, User, Share2
} from "lucide-react";

const LAB_NAME = "CBC Lab Analyzer";
const TAGLINE = "Accurate results you can trust.";
const EMAIL = "masoomsarkar66@gmail.com";
const SITE_URL = "https://www.cbclabanalyzer.com";

const ACCENTS = [
  { grad: "from-blue-500 to-blue-600", text: "text-blue-600" },
  { grad: "from-teal-500 to-teal-600", text: "text-teal-600" },
  { grad: "from-violet-500 to-violet-600", text: "text-violet-600" },
  { grad: "from-amber-500 to-amber-600", text: "text-amber-600" },
  { grad: "from-rose-500 to-rose-600", text: "text-rose-600" },
  { grad: "from-emerald-500 to-emerald-600", text: "text-emerald-600" },
];

const SERVICES = [
  { slug: "cbc", icon: Droplet, name: "Complete Blood Count", desc: "A full panel covering red cells, white cells, and platelets.", cbc: true,
    longDesc: "A Complete Blood Count is one of the most frequently ordered blood tests. It measures red blood cells, white blood cells, and platelets, giving your doctor a broad overview of your general health, immune function, and blood-related conditions.",
    bullets: ["Red & white blood cell counts", "Hemoglobin and hematocrit", "Platelet count", "Five-part WBC differential"],
    prepTips: ["No fasting required for most CBC tests", "Stay hydrated before your appointment", "Wear a short-sleeved or loose-sleeved top"],
    metaDesc: "Learn what a Complete Blood Count (CBC) measures and how to prepare for the test at Meridian Health Labs." },
  { slug: "blood-sugar", icon: Activity, name: "Blood Sugar Test", desc: "Fasting and random glucose screening.",
    longDesc: "Blood sugar testing measures the amount of glucose in your blood, helping screen for and monitor conditions related to blood sugar regulation. Both fasting and random testing options are available depending on what your doctor has recommended.",
    bullets: ["Fasting glucose option", "Random glucose option", "Quick sample collection", "Results typically same-day"],
    prepTips: ["Fasting tests usually require 8–12 hours without food", "Water is normally fine during the fasting window", "Take regular medications unless told otherwise"],
    metaDesc: "Fasting and random blood sugar testing at Meridian Health Labs — find out what to expect and how to prepare." },
  { slug: "lipid-profile", icon: Heart, name: "Lipid Profile", desc: "Cholesterol and triglyceride levels for heart health.",
    longDesc: "A lipid profile measures cholesterol and triglyceride levels in your blood, important markers your doctor uses to assess cardiovascular health and overall heart disease risk over time.",
    bullets: ["Total cholesterol", "HDL and LDL cholesterol", "Triglycerides", "Cardiovascular risk markers"],
    prepTips: ["Most lipid panels require 9–12 hours of fasting", "Avoid alcohol the evening before your test", "Continue regular medications unless advised otherwise"],
    metaDesc: "Check your cholesterol and triglyceride levels with a lipid profile test at Meridian Health Labs." },
  { slug: "liver-function", icon: FileText, name: "Liver Function Test", desc: "Enzymes and proteins that reflect liver health.",
    longDesc: "A liver function test panel checks a group of enzymes and proteins in your blood that reflect how well your liver is working, often used to investigate symptoms or monitor ongoing liver health.",
    bullets: ["Liver enzymes (ALT, AST)", "Bilirubin levels", "Total protein and albumin", "Comprehensive liver health snapshot"],
    prepTips: ["Some liver panels require fasting — check with your doctor", "Avoid alcohol for 24 hours before testing", "Mention any medications or supplements you're taking"],
    metaDesc: "Liver function testing at Meridian Health Labs checks key enzymes and proteins that reflect liver health." },
  { slug: "kidney-function", icon: Beaker, name: "Kidney Function Test", desc: "Key markers like creatinine and urea.",
    longDesc: "Kidney function testing measures markers like creatinine and urea, which help assess how effectively your kidneys are filtering waste from your bloodstream.",
    bullets: ["Creatinine levels", "Blood urea nitrogen (BUN)", "Estimated filtration markers", "Useful for routine health screening"],
    prepTips: ["Fasting is usually not required, but confirm with your doctor", "Stay normally hydrated before your visit", "Avoid intense exercise right before testing"],
    metaDesc: "Kidney function testing at Meridian Health Labs measures key markers of kidney health like creatinine and BUN." },
  { slug: "thyroid-profile", icon: Stethoscope, name: "Thyroid Profile", desc: "TSH, T3 and T4 levels for thyroid function.",
    longDesc: "A thyroid profile measures hormones like TSH, T3, and T4 that regulate your metabolism, helping your doctor evaluate thyroid gland function and screen for common thyroid-related conditions.",
    bullets: ["TSH (Thyroid Stimulating Hormone)", "T3 and T4 hormone levels", "Useful for energy & metabolism concerns", "Simple blood draw, no special prep"],
    prepTips: ["Most thyroid panels don't require fasting", "Take thyroid medication as instructed by your doctor before testing", "Morning testing is often preferred, since some hormones vary by time of day"],
    metaDesc: "Thyroid profile testing (TSH, T3, T4) at Meridian Health Labs helps evaluate thyroid gland function." },
];

const STEPS = [
  { icon: Calendar, title: "Book Appointment", desc: "Schedule your visit online or by phone in minutes." },
  { icon: Droplet, title: "Sample Collection", desc: "Visit our lab or request home collection." },
  { icon: Microscope, title: "Lab Processing", desc: "Your sample is analyzed by trained technicians." },
  { icon: FileText, title: "View Report Online", desc: "Get notified and view or download your results." },
];

const STATS = [
  { label: "Years Active", value: 12, suffix: "+" },
  { label: "Tests Completed", value: 250000, suffix: "+" },
  { label: "Happy Patients", value: 50000, suffix: "+" },
  { label: "Certified Staff", value: 30, suffix: "+" },
];

const BASIC_PARAMS = [
  { id: "wbc", label: "WBC (White Blood Cells)", unit: "×10⁹/L", range: [4.5, 11.0], note: "Part of your immune system, helping fight infection and inflammation." },
  { id: "rbc", label: "RBC (Red Blood Cells)", unit: "million/µL", rangeBySex: { M: [4.7, 6.1], F: [4.2, 5.4] }, note: "Carry oxygen from your lungs to the rest of your body." },
  { id: "hb", label: "Hemoglobin (Hb)", unit: "g/dL", rangeBySex: { M: [13.5, 17.5], F: [12.0, 15.5] }, note: "The oxygen-carrying protein inside red blood cells." },
  { id: "hct", label: "Hematocrit (HCT)", unit: "%", rangeBySex: { M: [38.8, 50], F: [34.9, 44.5] }, note: "The percentage of your blood volume made up of red blood cells." },
  { id: "mcv", label: "MCV", unit: "fL", range: [80, 100], note: "Reflects the average size of a single red blood cell." },
  { id: "mch", label: "MCH", unit: "pg", range: [27, 33], note: "Reflects the average amount of hemoglobin inside each red blood cell." },
  { id: "mchc", label: "MCHC", unit: "g/dL", range: [32, 36], note: "Reflects how concentrated hemoglobin is within your red blood cells." },
  { id: "rdw", label: "RDW", unit: "%", range: [11.5, 14.5], note: "Reflects how much variation there is in the size of your red blood cells." },
  { id: "plt", label: "Platelet Count", unit: "/µL", range: [150000, 450000], note: "Small cell fragments that help your blood clot." },
];

const DIFF_PARAMS = [
  { id: "neut", label: "Neutrophils", unit: "%", range: [40, 60], note: "Usually the first white blood cell to respond to infection." },
  { id: "lymph", label: "Lymphocytes", unit: "%", range: [20, 40], note: "Central to your immune system's response to viruses." },
  { id: "mono", label: "Monocytes", unit: "%", range: [2, 8], note: "Help clean up damaged tissue and fight longer-term infections." },
  { id: "eos", label: "Eosinophils", unit: "%", range: [1, 4], note: "Often involved in allergic reactions and fighting parasites." },
  { id: "baso", label: "Basophils", unit: "%", range: [0.5, 1], note: "The least common white blood cell, involved in inflammatory responses." },
];

const FAQS = [
  { q: "What is a CBC test?", a: "A Complete Blood Count (CBC) is one of the most common blood tests, giving a broad snapshot of your overall health by measuring red blood cells, white blood cells, and platelets from a single small sample." },
  { q: "How do I read my CBC report?", a: "Each value on your report sits next to a reference range — the typical range seen in healthy people. Our CBC Report Tool compares your numbers to these ranges automatically and explains what each parameter measures in plain language." },
  { q: "What is a normal hemoglobin level?", a: "Reference ranges differ slightly by sex: typically around 13.5–17.5 g/dL for men and 12.0–15.5 g/dL for women. Ranges can vary a little between laboratories, so always check the range printed on your specific report." },
  { q: "Why are platelet counts important?", a: "Platelets are small cell fragments that help your blood clot and stop bleeding. A typical range is roughly 150,000–450,000 per microliter; counts outside this range are worth discussing with your doctor." },
  { q: "When should I consult a doctor about my results?", a: "If any value falls outside the typical range, or you're experiencing symptoms like unusual fatigue, bruising, or fever, share your report with a qualified doctor. This tool is for general understanding only and is not a substitute for professional medical advice." },
];

const BLOG_CATS = ["Blood Health", "Test Guides", "Nutrition"];

/*
 * HOW TO ADD A NEW BLOG POST:
 * Copy one object below and update:
 *  id        – a unique number
 *  cat       – one of BLOG_CATS
 *  title     – post title
 *  dateISO   – "YYYY-MM-DD" (used for sorting "most recent")
 *  date      – display string, e.g. "Jun 2, 2026"
 *  author    – usually "Lab Content Team"
 *  reviewer  – your real medical reviewer, e.g. "Dr. Jane Smith, MBBS"
 *  excerpt   – one-sentence summary used on cards
 *  image     – { filename, alt, width, height } — add a real `src` once you
 *               have a licensed WebP photo, and it will render automatically
 *  content   – paragraphs separated by a blank line
 * All post content must be written from scratch — do not copy or closely
 * paraphrase any external article.
 */
const BLOG_POSTS = [
  {
    id: 1, cat: "Blood Health", title: "Understanding Your CBC: A Beginner's Guide",
    dateISO: "2026-05-28", date: "May 28, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Name], [Qualification]",
    excerpt: "A simple breakdown of what a CBC test measures and how to read your results.",
    image: { filename: "cbc-blood-test-overview.webp", alt: "Lab technician preparing blood sample tubes for a Complete Blood Count test", width: 800, height: 500 },
    content: `A Complete Blood Count, or CBC, is one of the simplest and most common blood tests there is. A small sample of your blood is enough to give doctors a broad snapshot of your overall health.

The test breaks your blood down into three main categories: red blood cells, which carry oxygen around your body; white blood cells, which are part of your immune system; and platelets, which help your blood clot.

Each value on your report sits next to a reference range — the typical range seen in healthy people. A result outside that range doesn't automatically mean something is wrong; ranges can vary slightly by lab, age, and other factors.

That's why a CBC is best read together with your symptoms and history, with help from a qualified doctor, rather than on its own.`
  },
  {
    id: 2, cat: "Blood Health", title: "What Causes Low Hemoglobin?",
    dateISO: "2026-05-12", date: "May 12, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Name], [Qualification]",
    excerpt: "Understanding the general factors that can contribute to lower hemoglobin levels.",
    image: { filename: "low-hemoglobin-blood-sample.webp", alt: "Close-up of a blood sample tube used to test hemoglobin levels", width: 800, height: 500 },
    content: `Hemoglobin is the protein inside red blood cells responsible for carrying oxygen from your lungs to the rest of your body. When levels drop below the typical range, it's often described as low hemoglobin.

There are many possible general contributors, including not getting enough iron or certain vitamins from your diet, losing blood over time, or having a chronic condition that affects how your body makes red blood cells.

Symptoms can include feeling unusually tired, looking pale, or getting short of breath more easily — though many people with mildly low levels notice nothing at all.

Because the underlying cause varies so widely from person to person, low hemoglobin on a report is a starting point for a conversation with your doctor, not a diagnosis on its own.`
  },
  {
    id: 3, cat: "Test Guides", title: "How to Prepare for a Fasting Blood Test",
    dateISO: "2026-04-30", date: "Apr 30, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Name], [Qualification]",
    excerpt: "Simple tips to help you get ready for a fasting blood draw.",
    image: { filename: "fasting-blood-test-preparation.webp", alt: "Patient preparing for a fasting blood test at a diagnostic lab", width: 800, height: 500 },
    content: `Some blood tests work best when you've fasted beforehand. Here's what that usually involves.

Most fasting tests ask for around 8 to 12 hours without food, though plain water is normally fine — and often encouraged, since it makes your veins easier to find.

Unless your doctor tells you otherwise, it's generally fine to keep taking your regular medications. Try to avoid intense exercise and excess caffeine the morning of your test, as both can temporarily affect certain results.

Wearing a short-sleeved or loose-sleeved top makes sample collection quicker and more comfortable. If you're ever unsure whether your test requires fasting, just check with our team when you book.`
  },
  {
    id: 4, cat: "Test Guides", title: "CBC vs. Metabolic Panel: What's the Difference?",
    dateISO: "2026-04-18", date: "Apr 18, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Name], [Qualification]",
    excerpt: "Two common tests, two different jobs — here's how they compare.",
    image: { filename: "cbc-vs-metabolic-panel-lab.webp", alt: "Laboratory equipment used for blood panel testing", width: 800, height: 500 },
    content: `Two of the most commonly ordered lab tests are the Complete Blood Count (CBC) and the metabolic panel — and it's easy to mix them up.

A CBC focuses on the cells in your blood: red cells, white cells, and platelets. It's often used as a general health check or to investigate things like fatigue, infection, or unusual bruising.

A metabolic panel, by contrast, measures chemicals dissolved in your blood — things like glucose, electrolytes, and markers of kidney and liver function.

Doctors frequently order both together, since each test reveals a different piece of the puzzle. Neither replaces the other; they complement one another to build a fuller picture of your health.`
  },
  {
    id: 5, cat: "Nutrition", title: "5 Iron-Rich Foods to Support Healthy Blood",
    dateISO: "2026-04-05", date: "Apr 5, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Name], [Qualification]",
    excerpt: "Everyday foods that can help support healthy iron levels and blood health.",
    image: { filename: "iron-rich-foods-blood-health.webp", alt: "Iron-rich foods that support healthy blood and hemoglobin levels", width: 800, height: 500 },
    content: `Iron plays a key role in helping your body produce hemoglobin, the protein that carries oxygen in your red blood cells. A varied diet is one of the simplest ways to support healthy iron levels.

1. Spinach and other dark leafy greens
2. Red meat, poultry, and fish
3. Lentils, chickpeas, and other legumes
4. Pumpkin seeds and nuts
5. Iron-fortified cereals and whole grains

Pairing iron-rich foods with a source of vitamin C, like citrus fruit or peppers, can help your body absorb iron more effectively. If you're ever concerned about your iron levels specifically, your CBC and a conversation with your doctor are the best place to start.`
  },
  {
    id: 6, cat: "Nutrition", title: "Hydration Tips Before Your Lab Visit",
    dateISO: "2026-03-22", date: "Mar 22, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Name], [Qualification]",
    excerpt: "Why drinking water beforehand can make your blood draw quicker and easier.",
    image: { filename: "hydration-before-blood-draw.webp", alt: "Glass of water representing hydration tips before a blood draw", width: 800, height: 500 },
    content: `Staying well hydrated before a blood draw can make the entire process faster and more comfortable — for you and for our technicians.

Water helps keep your veins more visible and easier to access, which usually means a quicker, smoother sample collection. Aim to drink a few glasses of water in the hours before your appointment, unless you've been asked to fast.

It's a good idea to go easy on coffee, tea, and other caffeinated drinks beforehand, since caffeine can have a mild dehydrating effect.

A simple habit like this won't change your results, but it can make your visit noticeably easier.`
  },
];

function useSEO({ title, description, image }) {
  useEffect(() => {
    document.title = title;
    const ogImage = image || `${SITE_URL}/og-image.jpg`;
    const setMeta = (attr, key, content) => {
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", typeof window !== "undefined" ? window.location.href : SITE_URL);
  }, [title, description, image]);
}

function useJsonLd(id, data) {
  const json = JSON.stringify(data);
  useEffect(() => {
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = json;
  }, [id, json]);
}

function getStatus(value, range) {
  if (value === "" || value === null || value === undefined) return null;
  const v = parseFloat(value);
  if (isNaN(v)) return null;
  if (v < range[0]) return "low";
  if (v > range[1]) return "high";
  return "normal";
}

function StatusBadge({ status }) {
  if (!status) return <span className="text-xs text-slate-400">—</span>;
  if (status === "normal") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full whitespace-nowrap">
        <CheckCircle className="w-3.5 h-3.5" /> Normal
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full whitespace-nowrap">
      <AlertTriangle className="w-3.5 h-3.5" /> {status === "high" ? "High" : "Low"}
    </span>
  );
}

function RangeBar({ value, range }) {
  const v = parseFloat(value);
  const has = value !== "" && value !== undefined && !isNaN(v);
  const lo = range[0], hi = range[1];
  const span = hi - lo;
  const padLo = lo - span * 0.6;
  const padHi = hi + span * 0.6;
  const pct = (n) => Math.max(0, Math.min(100, ((n - padLo) / (padHi - padLo)) * 100));
  const normLo = pct(lo), normHi = pct(hi);
  const status = has ? (v < lo ? "low" : v > hi ? "high" : "normal") : null;
  return (
    <div className="relative h-1.5 bg-slate-100 rounded-full w-full mt-3">
      <div className="absolute h-1.5 bg-green-200 rounded-full" style={{ left: `${normLo}%`, width: `${normHi - normLo}%` }} />
      {has && (
        <div className={`absolute -top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow ${status === "normal" ? "bg-green-500" : "bg-red-500"}`} style={{ left: `calc(${pct(v)}% - 7px)` }} />
      )}
    </div>
  );
}

function ParamRow({ param, value, onChange, range }) {
  const status = getStatus(value, range);
  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex-1 min-w-[180px]">
          <div className="font-medium text-slate-800 text-sm">{param.label}</div>
          <div className="text-xs text-slate-400">Normal: {range[0].toLocaleString()}–{range[1].toLocaleString()} {param.unit}</div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(param.id, e.target.value)}
            placeholder="0"
            className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <span className="text-xs text-slate-400 w-14">{param.unit}</span>
          <div className="w-20 text-right"><StatusBadge status={status} /></div>
        </div>
      </div>
      <RangeBar value={value} range={range} />
      <p className="text-xs text-slate-400 mt-2 max-w-2xl">{param.note}</p>
    </div>
  );
}

function StatCounter({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(value);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-extrabold text-white">{count.toLocaleString()}{suffix}</div>
      <div className="text-blue-100 text-sm mt-1">{label}</div>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`h-full transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`transition-transform duration-200 ease-out h-full ${className}`}>
      {children}
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-teal-500 z-[60]" style={{ width: `${progress}%` }} />
  );
}

function LabImage({ src, filename, alt, width, height, className = "", priority = false }) {
  if (src) {
    return <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} className={className} />;
  }
  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-3 ${className}`}
    >
      <ImageIcon className="w-6 h-6 text-slate-400 mb-1.5" />
      <span className="text-[10px] font-mono text-slate-500 break-all leading-tight">{filename}</span>
    </div>
  );
}

function NavBar({ page, navigate, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "home", label: "Home" },
    { id: "cbc", label: "CBC Report" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className={`no-print sticky top-0 z-50 backdrop-blur border-b transition-all duration-300 ${scrolled ? "bg-white/95 border-slate-200 shadow-md" : "bg-white/70 border-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button onClick={() => navigate("home")} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-800 text-lg">{LAB_NAME}</span>
        </button>
        <nav className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <button key={l.id} onClick={() => navigate(l.id)} className={`relative text-sm font-medium py-1 transition-colors ${page === l.id ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}>
              {l.label}
              <span className={`absolute left-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full transition-all duration-300 ${page === l.id ? "w-full" : "w-0"}`} />
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <button onClick={() => navigate("cbc")} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm">
            Check Your Report
          </button>
        </div>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 animate-menu-in">
          {links.map((l, i) => (
            <button key={l.id} style={{ animationDelay: `${i * 40}ms` }} onClick={() => navigate(l.id)} className={`animate-link-in block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${page === l.id ? "bg-blue-50 text-blue-600" : "text-slate-600"}`}>
              {l.label}
            </button>
          ))}
          <button style={{ animationDelay: `${links.length * 40}ms` }} onClick={() => navigate("cbc")} className="animate-link-in block w-full text-center mt-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full">
            Check Your Report
          </button>
        </div>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  useSEO({
    title: `${LAB_NAME} | CBC Report Checker & Diagnostic Lab Services`,
    description: "Check your Complete Blood Count (CBC) report online, understand your blood test results, and explore diagnostic laboratory services at Meridian Health Labs.",
  });
  const recentPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO)).slice(0, 3);
  const cbcService = SERVICES.find((s) => s.cbc);
  const otherServices = SERVICES.filter((s) => !s.cbc);
  const spotRef = useRef(null);
  const handleHeroMove = (e) => {
    if (!spotRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(550px circle at ${x}px ${y}px, rgba(37,99,235,0.16), transparent 60%)`;
  };

  return (
    <div>
      <section onMouseMove={handleHeroMove} className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 pt-16 pb-28 sm:pt-20 sm:pb-36">
        <div ref={spotRef} className="absolute inset-0 pointer-events-none transition-[background] duration-300" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute top-60 -left-32 w-80 h-80 bg-blue-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm border border-blue-100">
                <ShieldCheck className="w-3.5 h-3.5" /> Certified Diagnostic Laboratory
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Your CBC Report,<br />
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-teal-500 bg-clip-text text-transparent animate-gradient-text">Clear &amp; Simple</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg mb-8">{TAGLINE} View, understand, and download your Complete Blood Count (CBC) report online — anytime, anywhere.</p>
              <button onClick={() => navigate("cbc")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2">
                Check Your Report <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-6 mt-10 text-sm">
                <span className="font-bold text-slate-800">12+ <span className="font-normal text-slate-500">years</span></span>
                <span className="w-px h-4 bg-slate-300" />
                <span className="font-bold text-slate-800">50,000+ <span className="font-normal text-slate-500">patients</span></span>
                <span className="w-px h-4 bg-slate-300" />
                <span className="font-bold text-slate-800">24h <span className="font-normal text-slate-500">turnaround</span></span>
              </div>
            </div>
            <div className="relative h-80 sm:h-96 hidden sm:block">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-600 via-violet-500 to-teal-400 shadow-2xl overflow-hidden">
                <div className="absolute w-24 h-24 bg-white/15 rounded-full top-8 left-8 animate-float-slow" />
                <div className="absolute w-16 h-16 bg-white/20 rounded-full bottom-14 right-14 animate-float" />
                <div className="absolute w-10 h-10 bg-amber-300/40 rounded-full top-1/2 left-1/3 animate-float-slow" />
                <div className="absolute w-8 h-8 bg-rose-300/40 rounded-full top-16 right-1/3 animate-float" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur rounded-2xl shadow-xl p-4 w-48 border border-white">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-slate-700">Hemoglobin</span>
                </div>
                <div className="text-lg font-bold text-slate-900">14.2 g/dL</div>
                <div className="text-xs text-green-600 font-medium">Within normal range</div>
              </div>
              <div className="absolute -top-6 -right-4 bg-white/95 backdrop-blur rounded-2xl shadow-xl p-4 w-40 border border-white">
                <div className="text-xs text-slate-500 mb-1">Report Ready</div>
                <div className="text-sm font-bold text-blue-600">Today, 10:42 AM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 80" className="w-full h-14 sm:h-20 block" preserveAspectRatio="none">
            <path fill="#f8fafc" d="M0,32 C240,76 480,4 720,28 C960,52 1200,76 1440,28 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Our Diagnostic Laboratory Services</h2>
            <p className="text-slate-500">Comprehensive blood testing and analysis across all major health categories.</p>
          </div>
          <div className="space-y-6">
            <Reveal>
              <button onClick={() => navigate("service", cbcService.slug)} className="w-full text-left relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-blue-600 via-violet-600 to-teal-500 text-white group hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute -right-12 -top-12 w-56 h-56 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wide">Featured</span>
                    <h3 className="text-2xl font-bold mt-2 mb-1">{cbcService.name}</h3>
                    <p className="text-white/80 max-w-xl">{cbcService.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-full self-start sm:self-center whitespace-nowrap group-hover:gap-3 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((s, i) => {
                const Icon = s.icon;
                const accent = ACCENTS[i % ACCENTS.length];
                return (
                  <Reveal key={s.slug} delay={i * 60}>
                    <TiltCard>
                      <button onClick={() => navigate("service", s.slug)} className="text-left w-full h-full relative bg-white rounded-2xl p-6 pt-8 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100">
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.grad}`} />
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.grad} flex items-center justify-center mb-4 shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-800 mb-2">{s.name}</h3>
                        <p className="text-sm text-slate-500 mb-3">{s.desc}</p>
                        <span className={`text-sm font-medium inline-flex items-center gap-1 ${accent.text}`}>
                          Learn more <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Simple Process</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-3">How It Works</h2>
          <p className="text-slate-500">From booking to results, in four simple steps.</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-300 via-violet-300 to-teal-400" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="text-center relative">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center mx-auto mb-4 relative z-10 shadow-md">
                      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${accent.grad} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-xs font-bold text-blue-600 mb-1 tracking-wide">STEP {i + 1}</div>
                    <h3 className="font-semibold text-slate-800 mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Health Articles</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">From Our Blog</h2>
            </div>
            <button onClick={() => navigate("blog")} className="text-sm font-semibold text-blue-600 inline-flex items-center gap-1">
              View All Articles <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <TiltCard>
                  <button onClick={() => navigate("post", p.id)} className="text-left w-full h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                    <LabImage {...p.image} className="w-full h-40 object-cover" />
                    <div className="p-5">
                      <span className="text-xs font-semibold text-teal-600">{p.cat}</span>
                      <h3 className="font-semibold text-slate-800 mt-1 mb-2 leading-snug">{p.title}</h3>
                      <p className="text-sm text-slate-500 mb-3">{p.excerpt}</p>
                      <span className="text-sm text-blue-600 font-medium inline-flex items-center gap-1">Read more <ChevronRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-blue-700 via-violet-600 to-teal-600">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CBCTool() {
  useSEO({
    title: `CBC Report Tool — Check Your Complete Blood Count Online | ${LAB_NAME}`,
    description: "Enter your CBC values and instantly compare them to standard reference ranges. A free online Complete Blood Count report checker with plain-language explanations.",
  });
  const [sex, setSex] = useState("M");
  const [patientName, setPatientName] = useState("");
  const [reportDate, setReportDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [values, setValues] = useState({});

  const handleChange = (id, val) => setValues((v) => ({ ...v, [id]: val }));
  const getRange = (param) => (param.rangeBySex ? param.rangeBySex[sex] : param.range);
  const allParams = [...BASIC_PARAMS, ...DIFF_PARAMS];
  const filledCount = allParams.filter((p) => values[p.id] !== undefined && values[p.id] !== "").length;
  const flagged = allParams.filter((p) => {
    const st = getStatus(values[p.id], getRange(p));
    return st && st !== "normal";
  });
  const abnormalCount = flagged.length;
  const progressPct = (filledCount / allParams.length) * 100;

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="no-print bg-gradient-to-br from-blue-600 via-blue-600 to-teal-600 py-14 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">CBC Report Tool</h1>
        <p className="text-blue-100 max-w-xl mx-auto">Enter your Complete Blood Count (CBC) values to instantly check your blood test results against standard reference ranges.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="print-only mb-6">
          <span className="font-bold text-xl text-slate-900">{LAB_NAME}</span>
          <p className="text-sm text-slate-500">Complete Blood Count (CBC) Report</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4">Patient Information</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Name</label>
              <input value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient name" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Report Date</label>
              <input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Sex</label>
              <div className="no-print flex gap-2">
                <button onClick={() => setSex("M")} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border ${sex === "M" ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600"}`}>Male</button>
                <button onClick={() => setSex("F")} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border ${sex === "F" ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600"}`}>Female</button>
              </div>
              <div className="print-only text-sm pt-2">{sex === "M" ? "Male" : "Female"}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-800 mb-2">Basic Parameters</h2>
              {BASIC_PARAMS.map((p) => (
                <ParamRow key={p.id} param={p} value={values[p.id] ?? ""} onChange={handleChange} range={getRange(p)} />
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-800 mb-2">Differential WBC</h2>
              {DIFF_PARAMS.map((p) => (
                <ParamRow key={p.id} param={p} value={values[p.id] ?? ""} onChange={handleChange} range={getRange(p)} />
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-slate-600">
              <strong className="text-slate-800">Disclaimer:</strong> Information on this site, including CBC results, is for informational purposes only and is not a substitute for professional medical advice. Always consult a qualified doctor about your health and test results.
            </div>
          </div>

          <aside className="no-print lg:sticky lg:top-24 lg:self-start space-y-4 h-fit">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Live Summary</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke={abnormalCount > 0 ? "#f59e0b" : "#22c55e"} strokeWidth="3" strokeDasharray={`${progressPct} 100`} strokeLinecap="round" style={{ transition: "stroke 0.4s, stroke-dasharray 0.4s" }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">{filledCount}/{allParams.length}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700">Parameters filled</div>
                  <div className="text-xs text-slate-400">{allParams.length - filledCount} remaining</div>
                </div>
              </div>
              {filledCount > 0 && (
                <div className={`mt-4 rounded-xl p-3 flex items-center gap-2 text-sm ${abnormalCount > 0 ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>
                  {abnormalCount > 0 ? <AlertTriangle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle className="w-4 h-4 flex-shrink-0" />}
                  {abnormalCount > 0 ? `${abnormalCount} value${abnormalCount > 1 ? "s" : ""} need attention` : "All within range"}
                </div>
              )}
              {flagged.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Needs attention</div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {flagged.map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-sm bg-red-50 rounded-lg px-3 py-2">
                        <span className="text-slate-700">{p.label}</span>
                        <StatusBadge status={getStatus(values[p.id], getRange(p))} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-2">
              <button onClick={() => window.print()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors text-sm">
                <Printer className="w-4 h-4" /> Print / Save as PDF
              </button>
              <button onClick={() => { setValues({}); setPatientName(""); }} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm">
                Clear Form
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ServicePage({ slug, navigate }) {
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const service = idx >= 0 ? SERVICES[idx] : SERVICES[0];
  const accent = ACCENTS[Math.max(idx, 0) % ACCENTS.length];
  useSEO({ title: `${service.name} | ${LAB_NAME}`, description: service.metaDesc });
  useJsonLd("schema-service", {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: service.name,
    description: service.longDesc,
  });
  const Icon = service.icon;
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div>
      <section className={`bg-gradient-to-br ${accent.grad} py-16 px-4 sm:px-6 text-center text-white`}>
        <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4"><Icon className="w-7 h-7" /></div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{service.name}</h1>
        <p className="max-w-xl mx-auto text-white/90">{service.desc}</p>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-3">About This Test</h2>
        <p className="text-slate-600 leading-relaxed mb-8">{service.longDesc}</p>
        <h2 className="text-xl font-bold text-slate-900 mb-3">What's Included</h2>
        <ul className="space-y-2 mb-8">
          {service.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-600"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{b}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold text-slate-900 mb-3">Preparation Tips</h2>
        <ul className="space-y-2 mb-10">
          {service.prepTips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-600"><ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />{t}</li>
          ))}
        </ul>
        {service.cbc ? (
          <button onClick={() => navigate("cbc")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2">
            <Droplet className="w-4 h-4" /> Open CBC Report Tool
          </button>
        ) : (
          <button onClick={() => navigate("contact")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2">
            Book This Test <ArrowRight className="w-4 h-4" />
          </button>
        )}
        <div className="mt-14 pt-8 border-t border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Other Services</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <button key={r.slug} onClick={() => navigate("service", r.slug)} className="text-left bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <RIcon className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="font-medium text-slate-800 text-sm">{r.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogListPage({ navigate }) {
  useSEO({
    title: `Health Articles &amp; Blog | ${LAB_NAME}`,
    description: "Original, doctor-reviewed articles about CBC tests, blood health, and lab test preparation from Meridian Health Labs.",
  });
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = BLOG_POSTS.filter((p) => (cat === "All" || p.cat === cat) && (p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase())));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Health Articles</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">Our Blog</h1>
        <p className="text-slate-500">Original, doctor-reviewed guides on blood health and lab testing.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {["All", ...BLOG_CATS].map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${cat === c ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-slate-400 py-10">No articles found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <button key={p.id} onClick={() => navigate("post", p.id)} className="text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <LabImage {...p.image} className="w-full h-40 object-cover" />
              <div className="p-5">
                <span className="text-xs font-semibold text-teal-600">{p.cat}</span>
                <h2 className="font-semibold text-slate-800 mt-1 mb-2 leading-snug">{p.title}</h2>
                <p className="text-sm text-slate-500 mb-3">{p.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{p.author}</span><span>•</span><span>{p.date}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogPostPage({ postId, navigate }) {
  const post = BLOG_POSTS.find((p) => p.id === postId) || BLOG_POSTS[0];
  useSEO({ title: `${post.title} | ${LAB_NAME}`, description: post.excerpt });
  useJsonLd("schema-blogpost", {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.dateISO,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    reviewedBy: { "@type": "Person", name: post.reviewer },
    publisher: { "@type": "Organization", name: LAB_NAME },
  });
  const related = BLOG_POSTS.filter((p) => p.id !== post.id && p.cat === post.cat).slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <button onClick={() => navigate("blog")} className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Blog
      </button>
      <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">{post.cat}</span>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
        <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5" />Written by {post.author}</span>
        <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
      </div>
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-2 rounded-lg mb-8">
        <ShieldCheck className="w-4 h-4" /> Medically reviewed by {post.reviewer}
      </div>
      <LabImage {...post.image} className="w-full h-56 sm:h-72 object-cover rounded-2xl mb-8" />
      <div className="text-slate-600 space-y-4 leading-relaxed">
        {post.content.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
      </div>
      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
        <span className="text-sm text-slate-500 inline-flex items-center gap-1"><Share2 className="w-4 h-4" /> Share:</span>
        <button aria-label="Share on Facebook" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-100"><Facebook className="w-4 h-4 text-slate-500" /></button>
        <button aria-label="Share on Instagram" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-100"><Instagram className="w-4 h-4 text-slate-500" /></button>
        <button aria-label="Share on WhatsApp" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-100"><MessageCircle className="w-4 h-4 text-slate-500" /></button>
      </div>
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="font-semibold text-slate-800 mb-4">Related Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <button key={r.id} onClick={() => navigate("post", r.id)} className="text-left bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="text-xs text-teal-600 font-semibold mb-1">{r.cat}</div>
                <div className="font-medium text-slate-800 text-sm">{r.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  useSEO({
    title: `About Us | ${LAB_NAME}`,
    description: `Learn about ${LAB_NAME} — our mission, our certified medical laboratory team, and our commitment to accurate, accessible diagnostic testing.`,
  });
  return (
    <div>
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <LabImage filename="meridian-health-labs-team.webp" alt="Meridian Health Labs diagnostic laboratory team and facility" width={1200} height={500} className="absolute inset-0 w-full h-full object-cover rounded-none border-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About {LAB_NAME}</h1>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">We believe understanding your health shouldn't be complicated. {LAB_NAME} combines accurate, accredited medical laboratory services with tools that help patients actually understand their results — not just receive a printout full of numbers.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Team</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 mx-auto mb-3 flex items-center justify-center text-white font-bold">DR</div>
                <div className="font-semibold text-slate-800 text-sm">[Doctor / Pathologist Name]</div>
                <div className="text-xs text-slate-400">[Qualification, e.g. MBBS, FCPS]</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQPage() {
  useSEO({
    title: `CBC &amp; Blood Test FAQs | ${LAB_NAME}`,
    description: "Answers to common questions about CBC tests, normal hemoglobin levels, platelet counts, and when to consult a doctor about your blood test results.",
  });
  useJsonLd("schema-faq", {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  });
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Common Questions</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">Frequently Asked Questions</h1>
        <p className="text-slate-500">Quick answers about CBC tests and how to read your results.</p>
      </div>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full text-left px-6 py-4 flex items-center justify-between gap-4">
              <h3 className="font-medium text-slate-800 text-base">{f.q}</h3>
              <ChevronRight className={`w-4 h-4 text-blue-600 flex-shrink-0 transition-transform ${open === i ? "rotate-90" : ""}`} />
            </button>
            {open === i && <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  useSEO({
    title: `Contact Us | ${LAB_NAME}`,
    description: `Get in touch with ${LAB_NAME} for questions about blood tests, CBC reports, or our diagnostic laboratory services.`,
  });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Get In Touch</h1>
        <p className="text-slate-500">Questions about a test or your results? We're here to help.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4">
          {sent && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Thanks! Your message has been sent.
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Message</label>
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <button type="button" onClick={submit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors">Send Message</button>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-14 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">We're here to help</h3>
            <p className="text-blue-100 mb-8">Have a question about a test or your results? Reach out and our team will get back to you shortly.</p>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center"><Mail className="w-4 h-4" /></div>
              <span className="font-medium">{EMAIL}</span>
            </div>
            <div className="flex gap-3 pt-6 border-t border-white/20">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"><MessageCircle className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisclaimerPage() {
  useSEO({
    title: `Medical Disclaimer | ${LAB_NAME}`,
    description: `Important medical disclaimer regarding the use of CBC report information on ${LAB_NAME}'s website.`,
  });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
        <AlertTriangle className="w-7 h-7 text-amber-500" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Medical Disclaimer</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 text-slate-600 leading-relaxed space-y-4">
        <p>Information on this site, including CBC results, is for informational purposes only and is not a substitute for professional medical advice. Always consult a qualified doctor about your health and test results.</p>
        <p>{LAB_NAME} makes every effort to ensure the accuracy of testing and reference ranges shown, but reference ranges can vary between laboratories and individual circumstances. Only a licensed healthcare provider can interpret your results in the context of your full medical history.</p>
        <p>If you are experiencing a medical emergency, please contact your local emergency services immediately rather than relying on information from this website.</p>
      </div>
    </div>
  );
}

function PrivacyPage() {
  useSEO({
    title: `Privacy Policy | ${LAB_NAME}`,
    description: `Read the privacy policy for ${LAB_NAME}, covering how we collect, use, and protect your personal and health information.`,
  });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
        <Lock className="w-7 h-7 text-blue-600" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: [Month Year]</p>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 text-slate-600 leading-relaxed space-y-5 text-sm">
        <p className="bg-amber-50 text-amber-700 rounded-lg p-3">This is a general template. Please have a qualified lawyer review and customize it — especially the health-data sections — before publishing, since requirements vary by country (e.g. HIPAA, GDPR, or local health-data laws).</p>
        <div>
          <h2 className="font-semibold text-slate-800 mb-1 text-base">Information We Collect</h2>
          <p>We may collect information you provide directly, such as your name, email, and phone number, and any details entered into our contact form or CBC Report Tool.</p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-800 mb-1 text-base">How We Use Your Information</h2>
          <p>Information is used to respond to inquiries, schedule appointments, and provide diagnostic services. We do not sell personal information to third parties.</p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-800 mb-1 text-base">Health Information</h2>
          <p>Values you enter into our CBC Report Tool are processed in your browser to generate an informational comparison and are not stored on our servers unless you explicitly submit them through a form.</p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-800 mb-1 text-base">Contact Us</h2>
          <p>Questions about this policy can be sent to {EMAIL}.</p>
        </div>
      </div>
    </div>
  );
}

function TermsPage() {
  useSEO({
    title: `Terms & Conditions | ${LAB_NAME}`,
    description: `Terms and conditions for using the ${LAB_NAME} website and CBC Report Tool.`,
  });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
        <FileCheck className="w-7 h-7 text-blue-600" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Terms &amp; Conditions</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: [Month Year]</p>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 text-slate-600 leading-relaxed space-y-5 text-sm">
        <p className="bg-amber-50 text-amber-700 rounded-lg p-3">This is a general template. Please have a qualified lawyer review and customize it before publishing.</p>
        <div>
          <h2 className="font-semibold text-slate-800 mb-1 text-base">Use of This Website</h2>
          <p>This website and its CBC Report Tool are provided for general informational purposes only and do not constitute medical advice or a diagnosis.</p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-800 mb-1 text-base">No Medical Relationship</h2>
          <p>Using this website does not create a doctor-patient relationship. Always consult a qualified healthcare provider regarding your test results and any medical decisions.</p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-800 mb-1 text-base">Limitation of Liability</h2>
          <p>{LAB_NAME} is not liable for decisions made based solely on information from this website. Reference ranges shown are general and may differ from your lab's official report.</p>
        </div>
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="no-print bg-slate-900 text-slate-300 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center"><Droplet className="w-4 h-4 text-white" /></div>
              <span className="font-bold text-white">{LAB_NAME}</span>
            </div>
            <p className="text-sm text-slate-400 mb-3">{TAGLINE}</p>
            <div className="text-sm text-slate-400 mb-3">{EMAIL}</div>
            <div className="flex gap-2">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600"><MessageCircle className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3 text-sm">Company</div>
            <div className="space-y-2 text-sm">
              <button onClick={() => navigate("home")} className="block text-slate-400 hover:text-white">Home</button>
              <button onClick={() => navigate("about")} className="block text-slate-400 hover:text-white">About Us</button>
              <button onClick={() => navigate("blog")} className="block text-slate-400 hover:text-white">Blog</button>
              <button onClick={() => navigate("faq")} className="block text-slate-400 hover:text-white">FAQ</button>
              <button onClick={() => navigate("contact")} className="block text-slate-400 hover:text-white">Contact</button>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3 text-sm">Services</div>
            <div className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <button key={s.slug} onClick={() => navigate("service", s.slug)} className="block text-slate-400 hover:text-white">{s.name}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3 text-sm">Legal</div>
            <div className="space-y-2 text-sm">
              <button onClick={() => navigate("disclaimer")} className="block text-slate-400 hover:text-white">Disclaimer</button>
              <button onClick={() => navigate("privacy")} className="block text-slate-400 hover:text-white">Privacy Policy</button>
              <button onClick={() => navigate("terms")} className="block text-slate-400 hover:text-white">Terms &amp; Conditions</button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} {LAB_NAME}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useJsonLd("schema-org", {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: LAB_NAME,
    description: TAGLINE,
    email: EMAIL,
    url: SITE_URL,
    medicalSpecialty: "Pathology",
  });

  const navigate = (p, param) => {
    setPage(p);
    setParams(param ?? null);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          input, textarea, select { border: none !important; box-shadow: none !important; padding-left: 0 !important; }
        }
        .print-only { display: none; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-10px) translateX(8px)} }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
        @keyframes gradientShift { 0%,100%{background-position:0% center} 50%{background-position:100% center} }
        .animate-gradient-text { background-size: 200% auto; animation: gradientShift 4s ease infinite; }
        @keyframes pageIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        .animate-page-in { animation: pageIn 0.4s ease-out; }
        @keyframes menuIn { from { opacity:0; transform: translateY(-8px); } to { opacity:1; transform: translateY(0); } }
        .animate-menu-in { animation: menuIn 0.25s ease-out; }
        @keyframes linkIn { from { opacity:0; transform: translateX(-8px); } to { opacity:1; transform: translateX(0); } }
        .animate-link-in { animation: linkIn 0.3s ease-out both; }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #2563eb, #0d9488); border-radius: 6px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #1d4ed8, #0f766e); }
      `}</style>
      <ScrollProgress />
      <NavBar page={page} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main key={`${page}-${params ?? ""}`} className="animate-page-in">
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "cbc" && <CBCTool />}
        {page === "service" && <ServicePage slug={params} navigate={navigate} />}
        {page === "blog" && <BlogListPage navigate={navigate} />}
        {page === "post" && <BlogPostPage postId={params} navigate={navigate} />}
        {page === "about" && <AboutPage />}
        {page === "faq" && <FAQPage />}
        {page === "contact" && <ContactPage />}
        {page === "disclaimer" && <DisclaimerPage />}
        {page === "privacy" && <PrivacyPage />}
        {page === "terms" && <TermsPage />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
