import { Link } from "react-router";
import {
	Mail,
	Phone,
	Github,
	MapPin,
	ArrowLeft,
	Printer,
} from "lucide-react";

// ---------- DATA (same source as portfolio) ----------
const NAME = "Matheus de Andrade Oliveira";
const CITY = "Nova Iguaçu – RJ";
const EMAIL = "matheusaoliv0507@gmail.com";
const WHATSAPP_NUMBERS = ["(21) 98874-8964", "(21) 98212-3395"];
const GITHUB = "github.com/matheusaoliv";

const objective =
	"Desenvolvedor Full Stack com sólida experiência em soluções práticas e inovação tecnológica. " +
	"Foco em UX e execução técnica para criar produtos de alto impacto. " +
	"Busco oportunidades para aplicar minha experiência em desenvolvimento de sistemas, " +
	"análise de dados e gestão de projetos em equipes de tecnologia dinâmicas.";

const experience = [
	{
		role: "Estagiário – Desenvolvedor Full Stack / Analista de Sistemas / Suporte TI",
		company: "Prefeitura Municipal de Japeri",
		period: "Atual",
		description:
			"Responsável por projetar, desenvolver e implementar soluções tecnológicas que impactam diretamente a vida de milhares de cidadãos. Liderança no desenvolvimento do SERI – Smart Parking.",
		highlights: [
			"+87% aumento na arrecadação municipal de estacionamento",
			"-65% redução no tempo médio de busca por vagas",
			"-40% diminuição nas emissões de CO₂ por circulação urbana",
			"4.8/5.0 avaliação média no app (1200+ reviews)",
			"15+ parcerias comerciais locais estabelecidas",
			"Dashboard com 50+ métricas em tempo real",
		],
	},
];

const education = {
	degree: "Bacharelado em Ciência da Computação",
	institution: "Universidade Estácio de Sá",
	period: "5º Período – Previsão de conclusão: 2025",
};

const technicalSkills = [
	{
		category: "Desenvolvimento Móvel",
		skills: "React Native, Flutter, Java (Android), Kotlin, Swift (iOS), Dart, Expo",
	},
	{
		category: "Desenvolvimento Web",
		skills: "JavaScript, TypeScript, React, Angular, Node.js, HTML5, CSS3, PHP, Python",
	},
	{
		category: "Banco de Dados & APIs",
		skills: "MySQL, PostgreSQL, MongoDB, APIs REST, Real-time APIs, Oracle Database, SQL Optimization",
	},
	{
		category: "DevOps & Cloud",
		skills: "AWS, Azure, Google Cloud, Docker, Kubernetes, Jenkins, GitLab CI, Git/GitHub",
	},
	{
		category: "UX/UI & Design",
		skills: "Figma, Adobe XD, Prototipagem, Design System, User Research, Wireframing, Usability Testing",
	},
	{
		category: "Análise & Visualização",
		skills: "Power BI, Tableau, Chart.js, D3.js, Google Analytics, Data Analysis, Excel Avançado, R",
	},
	{
		category: "Gestão & Metodologias",
		skills: "Scrum, Kanban, Agile, Project Management, Technical Leadership, Stakeholder Management",
	},
	{
		category: "Infraestrutura & Segurança",
		skills: "Cybersecurity, Network Protocols, Authentication, Authorization, Encryption, System Administration",
	},
];

const advancedCertifications = [
	"Google Associate Android Developer",
	"Flutter Certified Application Developer (FCAD)",
	"AWS Certified Developer – Associate",
	"Microsoft Certified: Azure Developer Associate",
	"Oracle Database SQL Certified Associate",
	"Microsoft Certified: Azure Database Administrator",
	"Google Data Analytics Professional Certificate",
	"Microsoft Certified: Data Analyst Associate",
];

const basicCertifications = [
	"Programação de Sistemas de Informação (C, Java, UML)",
	"Programação para Internet (HTML5, CSS, JavaScript, PHP, Python, Banco de Dados, Redes)",
	"Programação de Microcontroladores",
	"Programação para Dispositivos Móveis (Android)",
	"Marketing 4.0",
	"Auxiliar de Logística",
	"Informática Básica",
];

const projects = [
	{
		name: "SERI – Smart Parking",
		description:
			"Sistema Integrado de Estacionamento Rotativo Inteligente de Japeri. App móvel com mapa em tempo real, múltiplas formas de pagamento, central de monitoramento e programa de fidelidade.",
		stack: "React Native, Node.js, Real-time APIs, Payment Gateway, Dashboard Analytics, Google Maps API",
	},
	{
		name: "Sistema de Bicicletário Municipal de Japeri",
		description:
			"Plataforma completa com banco de dados para controle de bicicletas, usuários, check-in/out e gestão de vagas.",
		stack: "HTML, CSS, JavaScript, TypeScript, Node.js",
	},
	{
		name: "Pokedex 2.0",
		description:
			"App inspirado na Pokédex listando tipos, nomes, habilidades e imagens dos Pokémon.",
		stack: "React Native, API Externa",
	},
	{
		name: "Megapokedex",
		description:
			"Evolução da Pokédex com design moderno e alta performance renderizando dados em tempo real.",
		stack: "React, API Externa",
	},
	{
		name: "Project: The Last of Us",
		description:
			"Interface temática com personagens, eventos e cenários. Dados simulados para prototipagem.",
		stack: "React Native",
	},
];

// ---------- COMPONENT ----------
export default function CurriculoPage() {
	return (
		<>
			{/* Print-specific styles */}
			<style>{`
				@media print {
					.no-print { display: none !important; }
					body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
					.cv-page { box-shadow: none !important; max-width: 100% !important; margin: 0 !important; padding: 24px !important; }
					.cv-page * { color: #1a1a1a !important; }
					.cv-section-title { border-color: #333 !important; }
					a { text-decoration: underline; }
				}
			`}</style>

			{/* Toolbar */}
			<div className="no-print sticky top-0 z-50 bg-slate-900 border-b border-white/10 px-4 py-3">
				<div className="max-w-3xl mx-auto flex items-center justify-between">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
					>
						<ArrowLeft className="size-4" /> Voltar ao Portfólio
					</Link>
					<button
						onClick={() => window.print()}
						className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-4 py-2 text-sm hover:from-cyan-600 hover:to-indigo-700 transition"
					>
						<Printer className="size-4" /> Imprimir / Salvar PDF
					</button>
				</div>
			</div>

			{/* CV Content */}
			<div className="min-h-screen bg-slate-950 text-slate-100 print:bg-white print:text-black">
				<div className="cv-page max-w-3xl mx-auto bg-white/5 print:bg-white shadow-2xl my-8 print:my-0 p-8 md:p-12 rounded-2xl print:rounded-none space-y-6">
					{/* Header */}
					<header className="text-center border-b border-white/10 pb-6">
						<h1 className="text-3xl md:text-4xl font-bold tracking-tight">
							{NAME}
						</h1>
						<p className="mt-2 text-lg text-slate-300 print:text-gray-600">
							Desenvolvedor Full Stack | Analista de Sistemas
						</p>
						<div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400 print:text-gray-500">
							<span className="inline-flex items-center gap-1">
								<MapPin className="size-3.5" /> {CITY}
							</span>
							<a
								href={`mailto:${EMAIL}`}
								className="inline-flex items-center gap-1 hover:text-cyan-400 transition"
							>
								<Mail className="size-3.5" /> {EMAIL}
							</a>
							{WHATSAPP_NUMBERS.map((num) => (
								<span key={num} className="inline-flex items-center gap-1">
									<Phone className="size-3.5" /> {num}
								</span>
							))}
							<a
								href={`https://${GITHUB}`}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-1 hover:text-cyan-400 transition"
							>
								<Github className="size-3.5" /> {GITHUB}
							</a>
						</div>
					</header>

					{/* Objetivo */}
					<section>
						<h2 className="cv-section-title text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-1 mb-3">
							Objetivo Profissional
						</h2>
						<p className="text-sm text-slate-300 print:text-gray-700 leading-relaxed">
							{objective}
						</p>
					</section>

					{/* Experiência */}
					<section>
						<h2 className="cv-section-title text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-1 mb-3">
							Experiência Profissional
						</h2>
						{experience.map((exp) => (
							<div key={exp.role} className="mb-4">
								<div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
									<h3 className="font-semibold text-sm">{exp.role}</h3>
									<span className="text-xs text-slate-400 print:text-gray-500">
										{exp.period}
									</span>
								</div>
								<p className="text-sm text-cyan-400 print:text-gray-600 font-medium">
									{exp.company}
								</p>
								<p className="mt-1 text-sm text-slate-300 print:text-gray-700">
									{exp.description}
								</p>
								{exp.highlights && (
									<ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-400 print:text-gray-600">
										{exp.highlights.map((h) => (
											<li key={h} className="flex items-start gap-1.5">
												<span className="mt-1.5 size-1.5 rounded-full bg-cyan-500 print:bg-gray-500 shrink-0" />
												{h}
											</li>
										))}
									</ul>
								)}
							</div>
						))}
					</section>

					{/* Formação */}
					<section>
						<h2 className="cv-section-title text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-1 mb-3">
							Formação Acadêmica
						</h2>
						<div>
							<h3 className="font-semibold text-sm">{education.degree}</h3>
							<p className="text-sm text-cyan-400 print:text-gray-600 font-medium">
								{education.institution}
							</p>
							<p className="text-xs text-slate-400 print:text-gray-500">
								{education.period}
							</p>
						</div>
					</section>

					{/* Habilidades Técnicas */}
					<section>
						<h2 className="cv-section-title text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-1 mb-3">
							Habilidades Técnicas
						</h2>
						<div className="space-y-2">
							{technicalSkills.map((s) => (
								<div key={s.category} className="text-sm">
									<span className="font-semibold">{s.category}:</span>{" "}
									<span className="text-slate-300 print:text-gray-700">
										{s.skills}
									</span>
								</div>
							))}
						</div>
					</section>

					{/* Certificações */}
					<section>
						<h2 className="cv-section-title text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-1 mb-3">
							Certificações
						</h2>
						<div className="mb-3">
							<h3 className="font-semibold text-sm mb-1">
								Certificações Profissionais
							</h3>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-300 print:text-gray-700">
								{advancedCertifications.map((c) => (
									<li key={c} className="flex items-start gap-1.5">
										<span className="mt-1.5 size-1.5 rounded-full bg-cyan-500 print:bg-gray-500 shrink-0" />
										{c}
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-sm mb-1">
								Certificações Básicas
							</h3>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-300 print:text-gray-700">
								{basicCertifications.map((c) => (
									<li key={c} className="flex items-start gap-1.5">
										<span className="mt-1.5 size-1.5 rounded-full bg-slate-500 print:bg-gray-400 shrink-0" />
										{c}
									</li>
								))}
							</ul>
						</div>
					</section>

					{/* Projetos */}
					<section>
						<h2 className="cv-section-title text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-1 mb-3">
							Projetos
						</h2>
						<div className="space-y-3">
							{projects.map((p) => (
								<div key={p.name}>
									<h3 className="font-semibold text-sm">{p.name}</h3>
									<p className="text-sm text-slate-300 print:text-gray-700">
										{p.description}
									</p>
									<p className="text-xs text-slate-400 print:text-gray-500 mt-0.5">
										<span className="font-medium">Tecnologias:</span> {p.stack}
									</p>
								</div>
							))}
						</div>
					</section>

					{/* Competências complementares */}
					<section>
						<h2 className="cv-section-title text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-1 mb-3">
							Competências Complementares
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300 print:text-gray-700">
							<div>
								<span className="font-semibold">Comunicação Eficaz:</span>{" "}
								Apresentações técnicas para gestores públicos, documentação
								acessível, workshops de treinamento.
							</div>
							<div>
								<span className="font-semibold">Trabalho em Equipe:</span>{" "}
								Coordenação com designers UX/UI, integração com equipes de
								infraestrutura, mentoria de devs júniores.
							</div>
							<div>
								<span className="font-semibold">Resolução de Problemas:</span>{" "}
								Otimização de performance em tempo real, integração de sistemas
								legados, troubleshooting de produção.
							</div>
							<div>
								<span className="font-semibold">Gerenciamento de Projetos:</span>{" "}
								Sprint planning e retrospectivas, gestão de backlog e prioridades,
								coordenação de releases e deploys.
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
