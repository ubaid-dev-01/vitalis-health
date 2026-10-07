import blogHeartHealth from "@/assets/blog-heart-health.jpg";
import blogPrecisionMedicine from "@/assets/blog-precision-medicine.jpg";
import blogStressManagement from "@/assets/blog-stress-management.jpg";
import blogChildhoodVaccinations from "@/assets/blog-childhood-vaccinations.jpg";
import blogJointHealth from "@/assets/blog-joint-health.jpg";
import blogWomensScreenings from "@/assets/blog-womens-screenings.jpg";

export const doctors = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiology", rating: 4.9, patients: 342, image: "SC", bio: "Board-certified cardiologist with 15+ years of experience in interventional cardiology.", availability: 8, maxSlots: 12 },
  { id: 2, name: "Dr. James Miller", specialty: "Neurology", rating: 4.8, patients: 289, image: "JM", bio: "Specialist in neurological disorders and brain health with pioneering research.", availability: 10, maxSlots: 12 },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Oncology", rating: 4.9, patients: 315, image: "ER", bio: "Leading oncologist specializing in precision medicine and targeted therapies.", availability: 6, maxSlots: 10 },
  { id: 4, name: "Dr. Michael Park", specialty: "Orthopedics", rating: 4.7, patients: 278, image: "MP", bio: "Expert in sports medicine and joint replacement surgery.", availability: 9, maxSlots: 12 },
  { id: 5, name: "Dr. Lisa Thompson", specialty: "Pediatrics", rating: 4.9, patients: 421, image: "LT", bio: "Compassionate pediatrician dedicated to children's health and development.", availability: 5, maxSlots: 10 },
  { id: 6, name: "Dr. David Kim", specialty: "Women's Health", rating: 4.8, patients: 356, image: "DK", bio: "Comprehensive women's health specialist with focus on preventive care.", availability: 7, maxSlots: 10 },
  { id: 7, name: "Dr. Anna Wright", specialty: "Cardiology", rating: 4.7, patients: 198, image: "AW", bio: "Cardiac electrophysiologist with expertise in arrhythmia management.", availability: 11, maxSlots: 12 },
  { id: 8, name: "Dr. Robert Hayes", specialty: "Neurology", rating: 4.6, patients: 234, image: "RH", bio: "Neurologist specializing in stroke prevention and cognitive disorders.", availability: 4, maxSlots: 10 },
  { id: 9, name: "Dr. Maria Santos", specialty: "Oncology", rating: 4.8, patients: 267, image: "MS", bio: "Hematologist-oncologist focused on blood cancers and immunotherapy.", availability: 8, maxSlots: 12 },
  { id: 10, name: "Dr. Kevin O'Brien", specialty: "Orthopedics", rating: 4.7, patients: 301, image: "KO", bio: "Spine surgeon with minimally invasive surgical techniques.", availability: 3, maxSlots: 8 },
  { id: 11, name: "Dr. Jennifer Lee", specialty: "Pediatrics", rating: 4.9, patients: 389, image: "JL", bio: "Pediatric specialist in developmental medicine and adolescent health.", availability: 7, maxSlots: 10 },
  { id: 12, name: "Dr. Thomas Grant", specialty: "Women's Health", rating: 4.8, patients: 312, image: "TG", bio: "OB/GYN with expertise in high-risk pregnancies and fertility.", availability: 6, maxSlots: 10 },
];

export const patients = [
  { id: "P-1001", name: "Alice Johnson", age: 34, condition: "Hypertension", lastVisit: "2024-03-15", status: "Active", doctor: "Dr. Sarah Chen", avatar: "AJ" },
  { id: "P-1002", name: "Bob Williams", age: 52, condition: "Diabetes Type 2", lastVisit: "2024-03-12", status: "Active", doctor: "Dr. James Miller", avatar: "BW" },
  { id: "P-1003", name: "Carol Davis", age: 45, condition: "Migraine", lastVisit: "2024-03-10", status: "Follow-up", doctor: "Dr. James Miller", avatar: "CD" },
  { id: "P-1004", name: "Daniel Brown", age: 67, condition: "Arthritis", lastVisit: "2024-03-08", status: "Active", doctor: "Dr. Michael Park", avatar: "DB" },
  { id: "P-1005", name: "Eva Martinez", age: 28, condition: "Prenatal Care", lastVisit: "2024-03-14", status: "Active", doctor: "Dr. David Kim", avatar: "EM" },
  { id: "P-1006", name: "Frank Wilson", age: 41, condition: "Back Pain", lastVisit: "2024-03-11", status: "Discharged", doctor: "Dr. Michael Park", avatar: "FW" },
  { id: "P-1007", name: "Grace Lee", age: 55, condition: "Breast Cancer", lastVisit: "2024-03-13", status: "Active", doctor: "Dr. Emily Rodriguez", avatar: "GL" },
  { id: "P-1008", name: "Henry Taylor", age: 73, condition: "Heart Failure", lastVisit: "2024-03-09", status: "Critical", doctor: "Dr. Sarah Chen", avatar: "HT" },
];

export const appointments = [
  { id: 1, patient: "Alice Johnson", doctor: "Dr. Sarah Chen", time: "09:00 AM", date: "2024-03-18", type: "Check-up", status: "Confirmed" },
  { id: 2, patient: "Bob Williams", doctor: "Dr. James Miller", time: "09:30 AM", date: "2024-03-18", type: "Follow-up", status: "Confirmed" },
  { id: 3, patient: "Carol Davis", doctor: "Dr. Emily Rodriguez", time: "10:00 AM", date: "2024-03-18", type: "Consultation", status: "Pending" },
  { id: 4, patient: "Daniel Brown", doctor: "Dr. Michael Park", time: "10:30 AM", date: "2024-03-18", type: "Surgery Prep", status: "Confirmed" },
  { id: 5, patient: "Eva Martinez", doctor: "Dr. David Kim", time: "11:00 AM", date: "2024-03-18", type: "Prenatal", status: "Confirmed" },
  { id: 6, patient: "Frank Wilson", doctor: "Dr. Lisa Thompson", time: "11:30 AM", date: "2024-03-18", type: "Check-up", status: "Cancelled" },
  { id: 7, patient: "Grace Lee", doctor: "Dr. Emily Rodriguez", time: "01:00 PM", date: "2024-03-18", type: "Treatment", status: "Pending" },
  { id: 8, patient: "Henry Taylor", doctor: "Dr. Sarah Chen", time: "02:00 PM", date: "2024-03-18", type: "Emergency", status: "Confirmed" },
];

export const inventory = [
  { id: 1, item: "Surgical Gloves", stock: 12, unit: "boxes", threshold: 50, status: "Critical" },
  { id: 2, item: "Syringes (10ml)", stock: 45, unit: "units", threshold: 100, status: "Low" },
  { id: 3, item: "PPE Kits", stock: 8, unit: "kits", threshold: 30, status: "Critical" },
  { id: 4, item: "Bandages", stock: 234, unit: "rolls", threshold: 100, status: "Normal" },
  { id: 5, item: "IV Drip Sets", stock: 67, unit: "sets", threshold: 50, status: "Normal" },
  { id: 6, item: "Face Masks (N95)", stock: 28, unit: "boxes", threshold: 40, status: "Low" },
  { id: 7, item: "Stethoscopes", stock: 15, unit: "units", threshold: 10, status: "Normal" },
  { id: 8, item: "Blood Pressure Monitors", stock: 9, unit: "units", threshold: 5, status: "Normal" },
];

export const blogPosts = [
  {
    id: 1,
    slug: "understanding-heart-health-complete-guide",
    title: "Understanding Heart Health: A Complete Guide",
    excerpt: "Learn about the key factors that influence cardiovascular health and what you can do to protect your heart.",
    category: "Cardiology",
    date: "March 15, 2024",
    readTime: "5 min read",
    author: "Dr. Sarah Chen",
    image: blogHeartHealth,
    highlights: ["Know your blood pressure numbers", "Build a heart-safe daily routine", "Spot early warning signs"],
    content: [
      "Heart health starts with daily habits that protect your blood vessels, manage cholesterol, and reduce long-term inflammation. Small choices made consistently often have the biggest impact.",
      "A balanced diet, regular movement, quality sleep, and routine screening work together to lower cardiac risk. Patients with a family history of heart disease should be especially proactive with preventive care.",
      "If you notice chest discomfort, unusual shortness of breath, dizziness, or swelling, seek medical guidance early. Timely diagnosis can prevent more serious cardiovascular complications.",
    ],
  },
  {
    id: 2,
    slug: "future-of-precision-medicine-in-cancer-treatment",
    title: "The Future of Precision Medicine in Cancer Treatment",
    excerpt: "How genetic profiling and targeted therapies are revolutionizing oncology and improving patient outcomes.",
    category: "Oncology",
    date: "March 12, 2024",
    readTime: "7 min read",
    author: "Dr. Emily Rodriguez",
    image: blogPrecisionMedicine,
    highlights: ["Treatment matched to tumor biology", "Fewer unnecessary therapies", "Better long-term monitoring"],
    content: [
      "Precision medicine helps oncologists match treatment to the unique biology of a patient's cancer. By studying tumor markers and genetic mutations, care plans become more specific and often more effective.",
      "This approach allows teams to personalize chemotherapy, immunotherapy, and targeted medications rather than relying on one standard protocol for every patient with the same diagnosis.",
      "The future of cancer care is increasingly data-driven, collaborative, and tailored to the individual. Patients benefit from faster decision-making, better monitoring, and improved quality of life during treatment.",
    ],
  },
  {
    id: 3,
    slug: "managing-stress-tips-for-a-healthier-mind",
    title: "Managing Stress: Tips for a Healthier Mind",
    excerpt: "Evidence-based strategies for managing stress, improving mental health, and building resilience.",
    category: "Wellness",
    date: "March 10, 2024",
    readTime: "4 min read",
    author: "Dr. James Miller",
    image: blogStressManagement,
    highlights: ["Use breathing resets during the day", "Protect sleep and recovery", "Know when to ask for support"],
    content: [
      "Stress affects the body as much as the mind. When stress becomes chronic, it can disturb sleep, raise blood pressure, weaken concentration, and contribute to burnout.",
      "Simple evidence-based practices such as breathwork, walking, reduced screen overload, and structured routines can help regulate the nervous system and improve resilience.",
      "If anxiety, sadness, or exhaustion begin to disrupt everyday life, professional support matters. Early wellness care can protect both mental and physical health over time.",
    ],
  },
  {
    id: 4,
    slug: "childhood-vaccinations-what-parents-need-to-know",
    title: "Childhood Vaccinations: What Parents Need to Know",
    excerpt: "A comprehensive overview of recommended childhood vaccines, schedules, and common concerns.",
    category: "Pediatrics",
    date: "March 8, 2024",
    readTime: "6 min read",
    author: "Dr. Lisa Thompson",
    image: blogChildhoodVaccinations,
    highlights: ["Stay on the recommended schedule", "Understand common mild reactions", "Ask questions with confidence"],
    content: [
      "Vaccinations protect children from serious preventable illness and help communities stay safer. Following the recommended schedule gives children protection at the right time in their development.",
      "Parents often ask about timing, side effects, and combination vaccines. Most post-vaccine reactions are mild and short-lived, while the protection gained is significant.",
      "A trusted pediatric care team can help families understand what is due, what to expect, and how to keep immunization records organized as children grow.",
    ],
  },
  {
    id: 5,
    slug: "joint-health-and-exercise-finding-the-right-balance",
    title: "Joint Health and Exercise: Finding the Right Balance",
    excerpt: "Expert advice on maintaining joint health through appropriate exercise and lifestyle modifications.",
    category: "Orthopedics",
    date: "March 5, 2024",
    readTime: "5 min read",
    author: "Dr. Michael Park",
    image: blogJointHealth,
    highlights: ["Strength supports joint stability", "Mobility reduces stiffness", "Pain should guide training choices"],
    content: [
      "Healthy joints need motion, strength, and recovery. Too little movement can increase stiffness, while poor form or overtraining may worsen strain and inflammation.",
      "Low-impact activity, guided mobility work, and targeted strength training help maintain function across the knees, hips, back, and shoulders.",
      "Persistent pain is a signal to adjust, not ignore. A specialist can help identify the cause and build a rehabilitation plan that protects long-term mobility.",
    ],
  },
  {
    id: 6,
    slug: "womens-health-screenings-by-age",
    title: "Women's Health Screenings by Age",
    excerpt: "Essential health screenings every woman should have at different stages of life for optimal wellness.",
    category: "Women's Health",
    date: "March 3, 2024",
    readTime: "6 min read",
    author: "Dr. David Kim",
    image: blogWomensScreenings,
    highlights: ["Screenings change with age and risk", "Preventive visits improve outcomes", "Personal history shapes timing"],
    content: [
      "Preventive screening is one of the most effective ways to catch health concerns early. The right schedule depends on age, medical history, family risk, and lifestyle factors.",
      "Routine visits may include blood pressure checks, breast health screening, cervical screening, bone health review, and metabolic risk monitoring.",
      "Women benefit most when preventive care is proactive rather than delayed. Regular conversations with a clinician help ensure the right tests happen at the right time.",
    ],
  },
];

export const testimonials = [
  { id: 1, name: "Margaret Johnson", quote: "The team at Vitalis Health saved my life. Their cardiology department is world-class, and Dr. Chen's expertise is unmatched.", rating: 5, avatar: "MJ" },
  { id: 2, name: "Robert Chen", quote: "From my first consultation to post-surgery recovery, every step was handled with incredible care and professionalism.", rating: 5, avatar: "RC" },
  { id: 3, name: "Sarah Williams", quote: "The pediatric team made my daughter feel so comfortable. Dr. Thompson is not just a great doctor — she's amazing with kids.", rating: 5, avatar: "SW" },
  { id: 4, name: "James Peterson", quote: "After years of back pain, Dr. Park's orthopedic treatment plan finally gave me relief. I'm back to living my life fully.", rating: 4, avatar: "JP" },
  { id: 5, name: "Linda Garcia", quote: "The women's health department provides comprehensive, compassionate care. I feel truly heard and cared for every visit.", rating: 5, avatar: "LG" },
];

export const services = [
  { id: 1, name: "Cardiology", icon: "Heart", description: "Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.", features: ["ECG & Echocardiography", "Cardiac Catheterization", "Heart Failure Management", "Preventive Cardiology"] },
  { id: 2, name: "Neurology", icon: "Brain", description: "Expert diagnosis and treatment of neurological conditions with cutting-edge technology.", features: ["EEG & EMG Testing", "Stroke Management", "Epilepsy Treatment", "Movement Disorders"] },
  { id: 3, name: "Oncology", icon: "Microscope", description: "Advanced cancer care with personalized treatment plans and the latest therapies.", features: ["Precision Medicine", "Immunotherapy", "Radiation Oncology", "Supportive Care"] },
  { id: 4, name: "Orthopedics", icon: "Bone", description: "Complete musculoskeletal care from sports injuries to joint replacements.", features: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Physical Therapy"] },
  { id: 5, name: "Pediatrics", icon: "Baby", description: "Nurturing healthcare for children from newborns to adolescents.", features: ["Well-Child Visits", "Vaccinations", "Developmental Screening", "Adolescent Medicine"] },
  { id: 6, name: "Women's Health", icon: "UserRound", description: "Dedicated women's health services across all stages of life.", features: ["Prenatal Care", "Gynecology", "Breast Health", "Menopause Management"] },
];

export const staff = [
  { id: 1, name: "Dr. Sarah Chen", role: "Cardiologist", department: "Cardiology", status: "Active", schedule: "Mon-Fri", caseload: 85, avatar: "SC" },
  { id: 2, name: "Dr. James Miller", role: "Neurologist", department: "Neurology", status: "Active", schedule: "Mon-Thu", caseload: 72, avatar: "JM" },
  { id: 3, name: "Dr. Emily Rodriguez", role: "Oncologist", department: "Oncology", status: "Active", schedule: "Mon-Fri", caseload: 90, avatar: "ER" },
  { id: 4, name: "Dr. Michael Park", role: "Orthopedic Surgeon", department: "Orthopedics", status: "On Leave", schedule: "Tue-Sat", caseload: 65, avatar: "MP" },
  { id: 5, name: "Nurse Patricia Adams", role: "Head Nurse", department: "General", status: "Active", schedule: "Mon-Fri", caseload: 95, avatar: "PA" },
  { id: 6, name: "Dr. Lisa Thompson", role: "Pediatrician", department: "Pediatrics", status: "Active", schedule: "Mon-Fri", caseload: 78, avatar: "LT" },
];

export const revenueData = [
  { month: "Apr", revenue: 95000, target: 90000, expense: 62000 },
  { month: "May", revenue: 102000, target: 95000, expense: 65000 },
  { month: "Jun", revenue: 98000, target: 100000, expense: 68000 },
  { month: "Jul", revenue: 115000, target: 105000, expense: 70000 },
  { month: "Aug", revenue: 108000, target: 110000, expense: 72000 },
  { month: "Sep", revenue: 120000, target: 112000, expense: 75000 },
  { month: "Oct", revenue: 118000, target: 115000, expense: 73000 },
  { month: "Nov", revenue: 125000, target: 118000, expense: 78000 },
  { month: "Dec", revenue: 130000, target: 120000, expense: 82000 },
  { month: "Jan", revenue: 122000, target: 122000, expense: 76000 },
  { month: "Feb", revenue: 128000, target: 125000, expense: 80000 },
  { month: "Mar", revenue: 135000, target: 128000, expense: 85000 },
];

export const recentActivity = [
  { id: 1, action: "New patient registered", detail: "Alice Johnson — Cardiology", time: "2 min ago", type: "patient" },
  { id: 2, action: "Appointment confirmed", detail: "Bob Williams with Dr. Miller", time: "15 min ago", type: "appointment" },
  { id: 3, action: "Invoice generated", detail: "VH-2024-0847 — $2,400.00", time: "32 min ago", type: "billing" },
  { id: 4, action: "Lab results uploaded", detail: "Carol Davis — Blood Panel", time: "1 hour ago", type: "lab" },
  { id: 5, action: "Inventory alert", detail: "Surgical Gloves — Critical Low", time: "2 hours ago", type: "inventory" },
  { id: 6, action: "Staff schedule updated", detail: "Dr. Park — On Leave", time: "3 hours ago", type: "staff" },
];

export const kpiData = {
  mock: { patients: 3241, appointments: 22, revenue: 89400, rating: 4.6 },
  live: { patients: 4821, appointments: 34, revenue: 128400, rating: 4.9 },
};

export const leadershipTeam = [
  { name: "Dr. Richard Hartley", role: "Chief Executive Officer", bio: "25+ years of healthcare leadership experience driving innovation and patient-centered care." },
  { name: "Dr. Amara Osei", role: "Chief Medical Officer", bio: "Former head of Johns Hopkins Medicine with expertise in clinical operations." },
  { name: "Jennifer Walsh", role: "Chief Operating Officer", bio: "Healthcare operations expert with a track record of organizational excellence." },
  { name: "Dr. Raj Patel", role: "Chief of Surgery", bio: "Pioneering surgeon with 500+ successful procedures and multiple research publications." },
  { name: "Michelle Torres", role: "Chief Nursing Officer", bio: "Passionate nursing leader focused on patient safety and care quality." },
  { name: "David Nakamura", role: "Chief Technology Officer", bio: "Tech innovator bringing digital transformation to modern healthcare." },
];

export const timelineEvents = [
  { year: "2000", title: "Founded", description: "Vitalis Health opens its first clinic with a vision for exceptional patient care." },
  { year: "2005", title: "First Expansion", description: "Opened second facility and launched cardiology and neurology departments." },
  { year: "2010", title: "Technology Pioneer", description: "Implemented electronic health records and telemedicine capabilities." },
  { year: "2015", title: "JCI Accreditation", description: "Received Joint Commission International accreditation for quality and safety." },
  { year: "2020", title: "Digital Health Leader", description: "Launched AI-powered diagnostics and virtual care platform during pandemic." },
  { year: "2024", title: "25 Years of Excellence", description: "Celebrating 15,000+ patients served with 98.4% satisfaction rate." },
];

export const invoices = [
  { id: "VH-2024-0841", patient: "Alice Johnson", amount: 1200, date: "2024-03-15", status: "Paid" },
  { id: "VH-2024-0842", patient: "Bob Williams", amount: 3500, date: "2024-03-14", status: "Paid" },
  { id: "VH-2024-0843", patient: "Carol Davis", amount: 800, date: "2024-03-13", status: "Unpaid" },
  { id: "VH-2024-0844", patient: "Daniel Brown", amount: 5200, date: "2024-03-12", status: "Paid" },
  { id: "VH-2024-0845", patient: "Eva Martinez", amount: 950, date: "2024-03-11", status: "Overdue" },
  { id: "VH-2024-0846", patient: "Frank Wilson", amount: 2100, date: "2024-03-10", status: "Paid" },
  { id: "VH-2024-0847", patient: "Grace Lee", amount: 4800, date: "2024-03-09", status: "Unpaid" },
];
