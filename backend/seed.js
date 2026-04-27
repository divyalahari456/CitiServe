/**
 * Seed Script for Citi-Serve Database
 * Populates MongoDB with authentic Indian Laws & Government Schemes data.
 * 
 * Sources:
 *  - https://www.legislative.gov.in/constitution-of-india
 *  - https://www.indiacode.nic.in
 *  - https://www.myscheme.gov.in
 *  - https://www.india.gov.in
 * 
 * Usage: node seed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Law = require('./models/Law');
const Scheme = require('./models/Scheme');

dotenv.config();

const laws = [
  // ─── EDUCATION ────────────────────────────────────────
  {
    title: "Right to Education Act (RTE), 2009",
    description: "Mandates free and compulsory education for all children between the ages of 6 and 14 years in India. It was enacted under Article 21-A of the Constitution.",
    category: "Education",
    benefits: "Free school admission, no capitation fees, no screening of children or parents during admission. Schools must maintain specified pupil-teacher ratios. No child can be held back, expelled, or required to pass a board examination until class 8.",
    howToUse: "Approach the nearest government or government-aided school with the child's birth certificate and address proof for immediate enrollment. If denied, file a complaint with the local education authority.",
    officialLink: "https://education.gov.in/rte",
    source: "legislative.gov.in / indiacode.nic.in"
  },
  {
    title: "Mid-Day Meal Scheme (PM POSHAN)",
    description: "A centrally sponsored scheme that provides cooked meals to every child in government and government-aided primary schools (Classes I to VIII).",
    category: "Education",
    benefits: "Free nutritious cooked lunch on every school working day. Improves enrollment, attendance, and nutrition levels among school children. Covers approximately 12 crore children across India.",
    howToUse: "The meal is served automatically in all eligible government and government-aided schools. Parents need not apply separately; enrollment in an eligible school is sufficient.",
    officialLink: "https://pmposhan.education.gov.in/",
    source: "india.gov.in"
  },
  {
    title: "National Education Policy (NEP) 2020",
    description: "A comprehensive framework restructuring India's education system. It replaces the 1986 policy and introduces a 5+3+3+4 school structure, multidisciplinary education, and vocational training from class 6.",
    category: "Education",
    benefits: "Promotes mother tongue as medium of instruction until grade 5. Introduces coding from class 6. Targets 100% Gross Enrollment Ratio (GER) in higher education by 2035. Establishes a single regulatory body for higher education (HECI).",
    howToUse: "The policy is being implemented in phases by state governments. Students and parents benefit automatically as schools and universities adopt the new curriculum and structure.",
    officialLink: "https://www.education.gov.in/nep-new",
    source: "india.gov.in"
  },

  // ─── HEALTH ───────────────────────────────────────────
  {
    title: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    description: "The world's largest government-funded health insurance scheme, providing health cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.",
    category: "Health",
    benefits: "Cashless and paperless treatment at empaneled hospitals across India. Covers pre and post hospitalization expenses, day-care surgeries, and over 1,500 medical procedures. No cap on family size, age, or gender.",
    howToUse: "Check eligibility at mera.pmjay.gov.in using your ration card or Aadhaar number. Visit any empaneled hospital with your Ayushman card or Aadhaar for cashless treatment. Helpline: 14555.",
    officialLink: "https://pmjay.gov.in/",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "National Health Policy, 2017",
    description: "Aims to attain the highest level of health and well-being for all citizens through a preventive and promotive healthcare approach. Targets raising public health expenditure to 2.5% of GDP.",
    category: "Health",
    benefits: "Free primary healthcare services, essential drugs, and diagnostics at public health facilities. Strengthens district hospitals and provides Universal Health Coverage (UHC).",
    howToUse: "Visit any primary health center (PHC), community health center (CHC), or government hospital to avail free consultations, essential medicines, and diagnostic services.",
    officialLink: "https://mohfw.gov.in/",
    source: "india.gov.in"
  },
  {
    title: "Mental Healthcare Act, 2017",
    description: "Provides for mental healthcare and services for persons with mental illness. It recognizes the right to access mental healthcare and treatment from the government.",
    category: "Health",
    benefits: "Every person has a right to access mental healthcare including affordable treatment. Decriminalizes attempted suicide (Section 115). Prohibits electro-convulsive therapy without anesthesia. Guarantees the right to make an advance directive on treatment preferences.",
    howToUse: "Contact the nearest government hospital's psychiatry department or district mental health program. File complaints with the Mental Health Review Board if rights are violated.",
    officialLink: "https://www.indiacode.nic.in/handle/123456789/2249",
    source: "indiacode.nic.in"
  },

  // ─── WOMEN SAFETY ─────────────────────────────────────
  {
    title: "Protection of Women from Domestic Violence Act, 2005",
    description: "Provides civil remedies to protect women from domestic violence, including physical, emotional, verbal, sexual, and economic abuse within the home.",
    category: "Women Safety",
    benefits: "Protection orders preventing the abuser from committing violence. Residence orders securing a woman's right to live in the shared household. Monetary relief for expenses incurred due to domestic violence. Custody orders for children.",
    howToUse: "File a complaint with the nearest police station, a Protection Officer, or a Magistrate court. Women can also call the Women's Helpline 181 or National Commission for Women helpline 7827-170-170.",
    officialLink: "https://wcd.nic.in/",
    source: "indiacode.nic.in / legislative.gov.in"
  },
  {
    title: "Sexual Harassment of Women at Workplace (PoSH) Act, 2013",
    description: "Mandates every employer with 10+ employees to constitute an Internal Complaints Committee (ICC) to handle complaints of sexual harassment at the workplace.",
    category: "Women Safety",
    benefits: "Provides a safe and confidential mechanism for women to report sexual harassment. Mandates inquiry completion within 90 days. Provides interim relief like transfer or leave. Penalizes employers who fail to constitute an ICC.",
    howToUse: "File a written complaint to the Internal Complaints Committee of your organization within 3 months of the incident. If no ICC exists, file with the Local Complaints Committee through the District Officer.",
    officialLink: "https://wcd.nic.in/act/sexual-harassment-women-workplace",
    source: "indiacode.nic.in"
  },
  {
    title: "Dowry Prohibition Act, 1961",
    description: "Prohibits the giving or receiving of dowry in connection with a marriage. Dowry includes any property or valuable security demanded as consideration for marriage.",
    category: "Women Safety",
    benefits: "Giving, taking, or demanding dowry is punishable with imprisonment of at least 5 years and a fine of ₹15,000 or the value of the dowry, whichever is more. Protects women from harassment related to dowry demands.",
    howToUse: "Lodge an FIR at the nearest police station. Complaints can also be made to the Dowry Prohibition Officer appointed in each district. Contact the Women's Helpline 181.",
    officialLink: "https://wcd.nic.in/",
    source: "legislative.gov.in"
  },

  // ─── LABOUR RIGHTS ────────────────────────────────────
  {
    title: "Minimum Wages Act, 1948",
    description: "Empowers the government to fix minimum wage rates for workers in scheduled employment, protecting them from exploitation by employers.",
    category: "Labour Rights",
    benefits: "Guarantees workers a minimum basic income. Wage rates are revised periodically based on cost of living. Applies to both organized and unorganized sector workers in scheduled employment.",
    howToUse: "If paid below the minimum wage, workers can file a complaint with the Labour Commissioner or approach a trade union. Claims can be filed before the Authority under the Act within one year.",
    officialLink: "https://labour.gov.in/",
    source: "indiacode.nic.in"
  },
  {
    title: "Payment of Wages Act, 1936",
    description: "Regulates the payment of wages to certain classes of workers. Ensures timely payment and prevents unauthorized deductions from wages.",
    category: "Labour Rights",
    benefits: "Wages must be paid before the 7th day (for establishments with fewer than 1,000 workers) or 10th day of the following month. Only authorized deductions are permitted. Employers violating these rules face penalties.",
    howToUse: "File a complaint with the Inspector appointed under the Act or the Labour Commissioner if wages are delayed or unauthorized deductions are made.",
    officialLink: "https://labour.gov.in/",
    source: "indiacode.nic.in"
  },
  {
    title: "Equal Remuneration Act, 1976",
    description: "Provides for payment of equal remuneration to men and women workers for same or similar work. Prevents discrimination against women in recruitment.",
    category: "Labour Rights",
    benefits: "Mandates equal pay for equal work regardless of gender. Employers cannot discriminate against women in recruitment, training, or promotions for the same work or work of a similar nature.",
    howToUse: "File a complaint with the Labour Commissioner or the Inspector under the Act. Workers can also approach the Labour Court for enforcement.",
    officialLink: "https://labour.gov.in/",
    source: "legislative.gov.in"
  },

  // ─── CONSUMER RIGHTS ──────────────────────────────────
  {
    title: "Consumer Protection Act, 2019",
    description: "Replaces the 1986 Act. Protects consumer interests and establishes the Central Consumer Protection Authority (CCPA) for timely administration and settlement of consumer disputes.",
    category: "Consumer Rights",
    benefits: "Six consumer rights: Right to Safety, Right to be Informed, Right to Choose, Right to be Heard, Right to Seek Redressal, and Right to Consumer Education. Covers e-commerce transactions. Introduces product liability provisions.",
    howToUse: "File a complaint online through the e-Daakhil portal (edaakhil.nic.in) or call the National Consumer Helpline 1915 (or 1800-11-4000, toll free). Three-tier redressal: District, State, and National Consumer Commissions.",
    officialLink: "https://consumerhelpline.gov.in/",
    source: "indiacode.nic.in / legislative.gov.in"
  },
  {
    title: "Right to Information Act (RTI), 2005",
    description: "Empowers every citizen to request information from public authorities, promoting transparency and accountability in governance. It applies to all constitutional authorities and bodies established by law.",
    category: "Consumer Rights",
    benefits: "Any citizen can request information from government bodies. Public authorities must respond within 30 days (48 hours if life/liberty is at stake). Promotes transparency, reduces corruption, and holds government accountable.",
    howToUse: "Submit an application to the Public Information Officer (PIO) of the relevant department with a fee of ₹10. File online via rtionline.gov.in for central government departments. If unsatisfied, appeal to the First Appellate Authority, then the Central/State Information Commission.",
    officialLink: "https://rtionline.gov.in/",
    source: "legislative.gov.in / indiacode.nic.in"
  },

  // ─── HOUSING ──────────────────────────────────────────
  {
    title: "Real Estate (Regulation and Development) Act, 2016 (RERA)",
    description: "Regulates and promotes the real estate sector to protect home-buyers and boost investments. Every state must establish a Real Estate Regulatory Authority.",
    category: "Housing",
    benefits: "Builders must register projects before advertising or selling. Standardized carpet area definitions. Buyers' money (70%) must be kept in a separate escrow account. Builders are liable for structural defects for 5 years post-possession.",
    howToUse: "Verify any project's RERA registration on your state's RERA website before buying. File complaints on the state RERA portal against builder defaults. Contact the Appellate Tribunal for appeals.",
    officialLink: "https://mohua.gov.in/",
    source: "indiacode.nic.in"
  },
  {
    title: "Pradhan Mantri Awas Yojana (PMAY) – Housing for All",
    description: "Government mission providing affordable housing to the urban and rural poor. It offers credit-linked subsidy for home loans to Economically Weaker Sections (EWS), Lower Income Groups (LIG), and Middle Income Groups (MIG).",
    category: "Housing",
    benefits: "Interest subsidy of up to 6.5% on home loans for EWS/LIG. Subsidy of 4% for MIG-I and 3% for MIG-II. Houses built under the scheme have a carpet area of 30 sq.m. for EWS and 60 sq.m. for LIG.",
    howToUse: "Apply online at pmaymis.gov.in or visit the nearest Common Service Centre (CSC). Approach any primary lending institution (banks, housing finance companies) to avail the credit-linked subsidy.",
    officialLink: "https://pmaymis.gov.in/",
    source: "india.gov.in / myscheme.gov.in"
  },

  // ─── ENVIRONMENT ──────────────────────────────────────
  {
    title: "Environment (Protection) Act, 1986",
    description: "An umbrella legislation authorizing the central government to protect and improve environmental quality, control and reduce pollution from all sources, and prohibit or restrict hazardous activities.",
    category: "Environment",
    benefits: "Empowers the government to set standards for emissions and discharges. Regulates industrial activities in environmentally sensitive areas. Violators face imprisonment of up to 5 years, fines up to ₹1 lakh, or both.",
    howToUse: "Report illegal dumping, industrial pollution, or violations to the State Pollution Control Board (SPCB). File complaints with the National Green Tribunal (NGT) for environmental damage.",
    officialLink: "https://moef.gov.in/",
    source: "legislative.gov.in / indiacode.nic.in"
  },
  {
    title: "Water (Prevention and Control of Pollution) Act, 1974",
    description: "Provides for the prevention and control of water pollution. Establishes Central and State Pollution Control Boards to monitor and enforce water quality standards.",
    category: "Environment",
    benefits: "Regulates discharge of pollutants into water bodies. Industries must obtain consent from the SPCB before discharging effluents. Violators face imprisonment up to 6 years and fines.",
    howToUse: "Report water pollution incidents to the State Pollution Control Board. Complaints can also be filed with the National Green Tribunal for quick resolution.",
    officialLink: "https://cpcb.nic.in/",
    source: "indiacode.nic.in"
  },
  {
    title: "National Green Tribunal Act, 2010",
    description: "Establishes the National Green Tribunal (NGT) for the effective and expeditious disposal of cases relating to environmental protection, conservation of forests, and enforcement of environmental laws.",
    category: "Environment",
    benefits: "Provides a specialized court for environmental disputes. Cases must be disposed of within 6 months. No court fee required for filing. NGT orders are binding and enforceable.",
    howToUse: "File an application or petition directly with the NGT (principal bench in New Delhi or zonal benches). Applications can be filed by any aggrieved person or environmental group. No lawyer is mandatory.",
    officialLink: "https://greentribunal.gov.in/",
    source: "indiacode.nic.in"
  }
];

const schemes = [
  // ─── AGRICULTURE / FARMERS ────────────────────────────
  {
    title: "PM Kisan Samman Nidhi (PM-KISAN)",
    description: "Income support scheme providing ₹6,000 per year to all landholding farmer families, paid in three equal installments of ₹2,000 every four months directly to their bank accounts.",
    eligibility: "All land-holding farmer families with cultivable land, subject to exclusion criteria (institutional landholders, income tax payers, and holders of constitutional posts are excluded).",
    benefits: "Direct income support of ₹6,000 per year (₹2,000 every 4 months) via Direct Benefit Transfer (DBT) to the farmer's Aadhaar-linked bank account.",
    targetRoles: ["Farmer"],
    maxIncome: null,
    link: "https://pmkisan.gov.in/",
    source: "myscheme.gov.in"
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Comprehensive crop insurance scheme to provide financial support to farmers suffering crop loss or damage due to natural calamities, pests, and diseases.",
    eligibility: "All farmers (including sharecroppers and tenant farmers) growing notified crops in notified areas. Both loanee and non-loanee farmers are eligible.",
    benefits: "Premium of only 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. Full sum insured covers yield losses. Post-harvest losses covered for up to 14 days.",
    targetRoles: ["Farmer"],
    maxIncome: null,
    link: "https://pmfby.gov.in/",
    source: "myscheme.gov.in / india.gov.in"
  },

  // ─── STUDENTS / YOUTH ─────────────────────────────────
  {
    title: "Post Matric Scholarship for SC/ST/OBC Students",
    description: "Provides financial assistance to students of Scheduled Castes, Scheduled Tribes, and Other Backward Classes studying at post-matriculation (Class 11 onwards) or post-secondary levels.",
    eligibility: "Students belonging to SC/ST/OBC categories studying post-matriculation. Family income must be below ₹2,50,000 per annum (SC/ST) or ₹1,00,000 (OBC) depending on the state.",
    benefits: "Covers tuition fees, maintenance allowance for hostellers and day scholars, study tour charges, thesis typing/printing charges, and book allowance. Amount varies by course and category.",
    targetRoles: ["Student"],
    maxIncome: 250000,
    link: "https://scholarships.gov.in/",
    source: "myscheme.gov.in"
  },
  {
    title: "Prime Minister's Internship Scheme (PMIS)",
    description: "Structured internship program for youth aged 21-24 years with top 500 companies in India. Aims to improve employability through 12-month hands-on experience.",
    eligibility: "Indian youth aged 21-24 years who are not employed full-time and not enrolled in full-time education. Family income must be below ₹8,00,000 per annum.",
    benefits: "Monthly stipend of ₹5,000 (₹4,500 from government + ₹500 from company). One-time grant of ₹6,000 from the government. 12-month structured internship with industry exposure and certification.",
    targetRoles: ["Student"],
    maxIncome: 800000,
    link: "https://pminternship.mca.gov.in/",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "Pradhan Mantri Vidya Lakshmi Yojana",
    description: "A portal-based scheme streamlining education loan access. Provides a single-window platform for students to access information and apply for education loans from multiple banks.",
    eligibility: "Indian students who have secured admission to recognized educational institutions in India or abroad. No specific income criteria for applying; loan terms vary by bank.",
    benefits: "Access to education loan schemes from 38+ banks through a single application. Interest subsidy for economically weaker students during the moratorium period under the Central Sector Interest Subsidy (CSIS) scheme.",
    targetRoles: ["Student"],
    maxIncome: null,
    link: "https://www.vidyalakshmi.co.in/",
    source: "myscheme.gov.in"
  },

  // ─── WORKERS / UNORGANIZED SECTOR ─────────────────────
  {
    title: "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
    description: "A government-funded voluntary pension scheme for unorganized sector workers, guaranteeing a minimum assured pension of ₹3,000/month after age 60.",
    eligibility: "Unorganized workers aged 18-40 years with monthly income up to ₹15,000. Must not be a member of EPFO/ESIC/NPS (government funded). Must have a savings bank account and Aadhaar.",
    benefits: "Assured monthly pension of ₹3,000 after attaining 60 years of age. Equal matching contribution by the Government of India. Family pension (50% of pension) to the spouse in case of the subscriber's death.",
    targetRoles: ["Worker"],
    maxIncome: 180000,
    link: "https://maandhan.in/",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "PM Vishwakarma Yojana",
    description: "Provides end-to-end support to traditional artisans and craftspeople through recognition, skill upgradation, toolkit incentives, credit support, and market linkage.",
    eligibility: "Traditional artisans and craftspeople working in 18 identified trades (carpenter, blacksmith, goldsmith, potter, sculptor, cobbler, tailor, washerman, etc.) aged 18+ years. Self-employed and unorganized sector workers.",
    benefits: "PM Vishwakarma Certificate and ID card. Up to ₹15,000 toolkit incentive. Collateral-free credit up to ₹3 lakh at 5% interest rate. Free skill training with a stipend of ₹500/day. Digital transaction incentive and marketing support.",
    targetRoles: ["Worker"],
    maxIncome: null,
    link: "https://pmvishwakarma.gov.in/",
    source: "myscheme.gov.in"
  },

  // ─── GENERAL / ALL CITIZENS ───────────────────────────
  {
    title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    description: "National mission for financial inclusion ensuring access to financial services, namely banking/savings accounts, remittance, credit, insurance, and pension for all unbanked households.",
    eligibility: "Any Indian citizen aged 10 years or above who does not have a bank account. Minor accounts (10-18 years) can be opened and operated by a natural guardian.",
    benefits: "Zero balance savings account with a RuPay debit card. Accidental insurance cover of ₹2 lakh. Life insurance cover of ₹30,000 for accounts opened before January 2015. Overdraft facility of up to ₹10,000.",
    targetRoles: ["Student", "Farmer", "Worker", "Other"],
    maxIncome: null,
    link: "https://pmjdy.gov.in/",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "Ayushman Bharat – PM Jan Arogya Yojana (PM-JAY)",
    description: "World's largest health insurance scheme providing ₹5 lakh health cover per family per year for secondary and tertiary care hospitalization to economically vulnerable families.",
    eligibility: "Poor and vulnerable families identified based on SECC 2011 data and active ration card holders under the National Food Security Act. No restrictions on family size, age, or gender.",
    benefits: "₹5 lakh health cover per family per year. Cashless and paperless treatment at empaneled hospitals. Covers 1,500+ medical procedures including surgeries, medical and day care treatments. Pre and post-hospitalization expenses covered.",
    targetRoles: ["Farmer", "Worker", "Other"],
    maxIncome: 100000,
    link: "https://pmjay.gov.in/",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "PM Surya Ghar: Muft Bijli Yojana",
    description: "Promotes rooftop solar energy by providing substantial subsidies to households for installing rooftop solar panels, aimed at providing free electricity up to 300 units per month.",
    eligibility: "Any residential household with a valid electricity connection. Must own or have legal access to the rooftop. The household's electricity consumer number is used for registration.",
    benefits: "Central subsidy of ₹30,000 for 1 kW system, ₹60,000 for 2 kW, and ₹78,000 for 3 kW or higher. Free electricity up to 300 units per month. Surplus electricity can be sold back to the grid.",
    targetRoles: ["Student", "Farmer", "Worker", "Other"],
    maxIncome: null,
    link: "https://pmsuryaghar.gov.in/",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "Sukanya Samriddhi Yojana",
    description: "A small savings scheme for the girl child offering high interest rates and tax benefits. Part of the Beti Bachao Beti Padhao campaign to secure the financial future of a girl child.",
    eligibility: "Parents or legal guardians of a girl child below the age of 10 years. Maximum two accounts (one per girl child) per family.",
    benefits: "High interest rate (currently ~8.2% per annum, reviewed quarterly). Tax benefits under Section 80C (up to ₹1.5 lakh). Maturity amount is fully tax-free. Partial withdrawal (50%) allowed after the girl turns 18 for higher education.",
    targetRoles: ["Student", "Other"],
    gender: "Female",
    maxAge: 10,
    maxIncome: null,
    link: "https://www.nsiindia.gov.in/",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "Atal Pension Yojana (APY)",
    description: "Government-backed pension scheme targeting unorganized sector workers. Guarantees a minimum pension of ₹1,000 to ₹5,000 per month after the age of 60, depending on contribution.",
    eligibility: "Indian citizens aged 18-40 years who have a savings bank account and are not members of any statutory social security scheme. Contribution varies by age and pension amount chosen.",
    benefits: "Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60. Government co-contribution of 50% for eligible subscribers (joined before 2015). Spouse continues to receive pension after subscriber's death; entire pension corpus returned to nominee.",
    targetRoles: ["Farmer", "Worker", "Other"],
    maxIncome: null,
    link: "https://npscra.nsdl.co.in/scheme-details.php",
    source: "myscheme.gov.in / india.gov.in"
  },
  {
    title: "NPS Vatsalya Yojana",
    description: "A pension scheme for minors that allows parents/guardians to invest for their child's future. On turning 18, the account seamlessly converts into a regular NPS account.",
    eligibility: "Any minor (below 18 years). Account opened by parent or legal guardian. No income criteria.",
    benefits: "Long-term wealth creation for children. Minimum contribution of ₹1,000 per year. Seamless conversion to regular NPS at age 18. Tax benefits for contributing parent. Professional fund management.",
    targetRoles: ["Student", "Other"],
    maxIncome: null,
    link: "https://npscra.nsdl.co.in/",
    source: "myscheme.gov.in / india.gov.in"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for Seeding');

    // Clear existing data
    await Law.deleteMany({});
    await Scheme.deleteMany({});
    console.log('🗑️  Cleared existing Laws and Schemes');

    // Insert laws
    const insertedLaws = await Law.insertMany(laws);
    console.log(`📚 Inserted ${insertedLaws.length} Laws`);

    // Insert schemes
    const insertedSchemes = await Scheme.insertMany(schemes);
    console.log(`🏛️  Inserted ${insertedSchemes.length} Schemes`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
