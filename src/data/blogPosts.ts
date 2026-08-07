
export const BLOG_CATS = [
  "Blood Health",
  "CBC Interpretation",
  "Blood Disorders",
  "Patient Education",
  "Nutrition"
];

/*
 * HOW TO ADD A NEW BLOG POST:
 * Copy one object below and update:
 *  id        – a unique number
 *  cat       – one of BLOG_CATS
 *  title     – post title
 *  dateISO   – "YYYY-MM-DD" (used for sorting "most recent")
 *  date      – display string, e.g. "Jun 2, 2026"
 *  author    – usually "Lab Content Team"
 *  reviewer  – your real medical reviewer, e.g. "Dr Jane Smith, MBBS"
 *  excerpt   – one-sentence summary used on cards
 *  image     – { filename, alt, width, height } — add a real `src` once you
 *               have a licensed WebP photo, and it will render automatically
 *  content   – paragraphs separated by a blank line
 * All post content must be written from scratch — do not copy or closely
 * paraphrase any external article.
 */


export const BLOG_POSTS = [
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
    id: 2, cat: "Blood Health", title: "What Causes Low Haemoglobin?",
    dateISO: "2026-05-12", date: "May 12, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Name], [Qualification]",
    excerpt: "Understanding the general factors that can contribute to lower hemoglobin levels.",
    image: { filename: "low-hemoglobin-blood-sample.webp", alt: "Close-up of a blood sample tube used to test hemoglobin levels", width: 800, height: 500 },
    content: `Hemoglobin is the protein inside red blood cells responsible for carrying oxygen from your lungs to the rest of your body. When levels drop below the typical range, it's often described as low hemoglobin.

There are many possible general contributors, including not getting enough iron or certain vitamins from your diet, losing blood over time, or having a chronic condition that affects how your body makes red blood cells.

Symptoms can include feeling unusually tired, looking pale, or getting short of breath more easily — though many people with mildly low levels notice nothing at all.

Because the underlying cause varies so widely from person to person, low haemoglobin on a report is a starting point for a conversation with your doctor, not a diagnosis on its own.`
  },
  {
    id: 3, cat: "Patient Education", title: "How to Prepare for a Fasting Blood Test",
    dateISO: "2026-04-30", date: "Apr 30, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Rizvi], [Bachelors]",
    excerpt: "Simple tips to help you get ready for a fasting blood draw.",
    image: { filename: "fasting-blood-test-preparation.webp", alt: "Patient preparing for a fasting blood test at a diagnostic lab", width: 800, height: 500 },
    content: `Some blood tests work best when you've fasted beforehand. Here's what that usually involves.

Most fasting tests ask for around 8 to 12 hours without food, though plain water is normally fine — and often encouraged, since it makes your veins easier to find.

Unless your doctor tells you otherwise, it's generally fine to keep taking your regular medications. Try to avoid intense exercise and excess caffeine the morning of your test, as both can temporarily affect certain results.

Wearing a short-sleeved or loose-sleeved top makes sample collection quicker and more comfortable. If you're ever unsure whether your test requires fasting, check with our team when you book.`
  },
  {
    id: 4, cat: "Patient Education", title: "CBC vs. Metabolic Panel: What's the Difference?",
    dateISO: "2026-04-18", date: "Apr 18, 2026",
    author: "Lab Content Team", reviewer: "Dr. [Rizvi], [Bachelors]",
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
