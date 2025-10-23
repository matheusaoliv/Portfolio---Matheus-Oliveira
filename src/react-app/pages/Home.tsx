import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/react-app/components/ui/card";
import { Badge } from "@/react-app/components/ui/badge";
import {
	Rocket,
	Sparkles,
	Phone,
	Mail,
	Github,
	ArrowRight,
	GraduationCap,
	Layout,
	Wrench,
	Cpu,
	Link as LinkIcon,
	Award,
	Target,
	Users,
	MessageCircle,
	Lightbulb,
	MapPin,
	Palette,
	TrendingUp,
	Shield,
	Cloud,
	Database,
	Smartphone,
	Globe,
} from "lucide-react";

// ---------- CONFIG ----------
const NAME = "Matheus de Andrade Oliveira";
const CITY = "Nova Iguaçu – RJ";
const EMAIL = "matheusaoliv0507@gmail.com";
const WHATS = ["21988748964", "21982123395"]; // apenas dígitos para link whatsapp
const GITHUB = "https://github.com/matheusaoliv";

const skillsCategories = [
	{
		title: "Desenvolvimento Móvel",
		icon: "📱",
		skills: [
			"React Native",
			"Flutter",
			"Java (Android)",
			"Kotlin",
			"Swift (iOS)",
			"Dart",
			"React Native CLI",
			"Expo",
		],
	},
	{
		title: "Desenvolvimento Web",
		icon: "💻",
		skills: [
			"JavaScript",
			"TypeScript",
			"React",
			"Angular",
			"Node.js",
			"HTML5",
			"CSS3",
			"PHP",
			"Python",
		],
	},
	{
		title: "Banco de Dados & APIs",
		icon: "🗄️",
		skills: [
			"MySQL",
			"PostgreSQL",
			"MongoDB",
			"APIs REST",
			"Real-time APIs",
			"Database Design",
			"Oracle Database",
			"SQL Optimization",
		],
	},
	{
		title: "DevOps & Cloud",
		icon: "☁️",
		skills: [
			"AWS",
			"Azure",
			"Google Cloud",
			"Docker",
			"Kubernetes",
			"Jenkins",
			"GitLab CI",
			"Git/GitHub",
		],
	},
	{
		title: "UX/UI & Design",
		icon: "🎨",
		skills: [
			"Figma",
			"Adobe XD",
			"Prototipagem",
			"Design System",
			"User Research",
			"Animações",
			"Wireframing",
			"Usability Testing",
		],
	},
	{
		title: "Análise & Visualização",
		icon: "📊",
		skills: [
			"Power BI",
			"Tableau",
			"Chart.js",
			"D3.js",
			"Google Analytics",
			"Data Analysis",
			"Excel Avançado",
			"R",
		],
	},
	{
		title: "Gestão & Metodologias",
		icon: "⚡",
		skills: [
			"Scrum",
			"Kanban",
			"Agile",
			"Project Management",
			"Technical Leadership",
			"Team Collaboration",
			"Stakeholder Management",
		],
	},
	{
		title: "Infraestrutura & Segurança",
		icon: "🔒",
		skills: [
			"Cybersecurity",
			"Network Protocols",
			"Authentication",
			"Authorization",
			"Encryption",
			"System Administration",
			"Technical Support",
		],
	},
];

// Certificações relevantes organizadas por categoria
const relevantCertifications = [
	{
		category: "Desenvolvimento Móvel",
		icon: Smartphone,
		color: "from-green-500 to-emerald-600",
		certs: [
			{
				name: "Google Associate Android Developer",
				description:
					"Capacidade de desenvolver aplicativos móveis nativos Android de alta qualidade",
				highlight: "Essencial para o desenvolvimento do app SERI",
			},
			{
				name: "Flutter Certified Application Developer (FCAD)",
				description:
					"Expertise em desenvolvimento de aplicativos multiplataforma eficientes",
				highlight: "Tecnologia aplicada em projetos cross-platform",
			},
		],
	},
	{
		category: "Cloud & Infraestrutura",
		icon: Cloud,
		color: "from-blue-500 to-cyan-600",
		certs: [
			{
				name: "AWS Certified Developer – Associate",
				description:
					"Expertise em serviços em nuvem, crucial para hospedagem e escalabilidade",
				highlight: "Infraestrutura escalável do sistema SERI",
			},
			{
				name: "Microsoft Certified: Azure Developer Associate",
				description:
					"Competência em desenvolvimento e gerenciamento de soluções Azure",
				highlight: "Alternativa robusta para soluções empresariais",
			},
		],
	},
	{
		category: "Banco de Dados",
		icon: Database,
		color: "from-purple-500 to-indigo-600",
		certs: [
			{
				name: "Oracle Database SQL Certified Associate",
				description:
					"Habilidades avançadas em gerenciamento e otimização de bancos de dados",
				highlight: "Performance e segurança do sistema de dados",
			},
			{
				name: "Microsoft Certified: Azure Database Administrator",
				description:
					"Administração especializada de bancos de dados em nuvem",
				highlight: "Essencial para sistemas de alta disponibilidade",
			},
		],
	},
	{
		category: "Análise de Dados",
		icon: TrendingUp,
		color: "from-orange-500 to-red-600",
		certs: [
			{
				name: "Google Data Analytics Professional Certificate",
				description:
					"Capacidade de analisar dados e criar visualizações interativas",
				highlight: "Dashboard da central de monitoramento SERI",
			},
			{
				name: "Microsoft Certified: Data Analyst Associate",
				description: "Expertise em Power BI e análise empresarial",
				highlight: "Métricas em tempo real e tomada de decisão",
			},
		],
	},
];

// Soft Skills estruturadas
const softSkills = [
	{
		title: "Comunicação Eficaz",
		icon: MessageCircle,
		description:
			"Comunicação clara de ideias técnicas para stakeholders não técnicos",
		examples: [
			"Apresentações técnicas para gestores públicos",
			"Documentação acessível para usuários finais",
			"Workshops de treinamento para equipes",
		],
	},
	{
		title: "Trabalho em Equipe",
		icon: Users,
		description: "Colaboração efetiva com equipes multidisciplinares",
		examples: [
			"Coordenação com designers UX/UI",
			"Integração com equipes de infraestrutura",
			"Mentoria de desenvolvedores júniores",
		],
	},
	{
		title: "Resolução de Problemas",
		icon: Lightbulb,
		description: "Identificação e solução de desafios técnicos complexos",
		examples: [
			"Otimização de performance em tempo real",
			"Integração de sistemas legados",
			"Troubleshooting de produção",
		],
	},
	{
		title: "Gerenciamento de Projetos",
		icon: Target,
		description: "Aplicação de metodologias ágeis para entregas eficientes",
		examples: [
			"Sprint planning e retrospectivas",
			"Gestão de backlog e prioridades",
			"Coordenação de releases e deploys",
		],
	},
];

// Conhecimentos em áreas específicas
const specializedKnowledge = [
	{
		title: "Mobilidade Urbana & Smart Cities",
		icon: MapPin,
		color: "from-cyan-500 to-blue-600",
		description:
			"Compreensão profunda dos desafios de mobilidade urbana e soluções tecnológicas",
		achievements: [
			"Redução de 65% no tempo de busca por vagas",
			"Diminuição de 40% nas emissões de CO₂",
			"Melhoria significativa no fluxo de tráfego urbano",
		],
	},
	{
		title: "UX/UI Design & Pesquisa",
		icon: Palette,
		color: "from-pink-500 to-purple-600",
		description: "Aplicação de princípios de design centrado no usuário",
		achievements: [
			"Interface intuitiva com 4.8/5.0 de avaliação",
			"Processo completo de research e testes",
			"Design system escalável e acessível",
		],
	},
	{
		title: "Gestão Pública & Políticas",
		icon: Shield,
		color: "from-green-500 to-teal-600",
		description: "Experiência em projetos governamentais e regulamentações",
		achievements: [
			"Compliance com regulamentações municipais",
			"Integração com sistemas públicos existentes",
			"Impacto direto em políticas de mobilidade",
		],
	},
	{
		title: "Marketing Digital & Parcerias",
		icon: TrendingUp,
		color: "from-orange-500 to-yellow-600",
		description: "Estratégias de crescimento e engajamento de usuários",
		achievements: [
			"15+ parcerias comerciais estabelecidas",
			"Programa de fidelidade implementado",
			"Estratégias de retenção de usuários",
		],
	},
];

const basicCerts = [
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
		title: "SERI - Smart Parking",
		subtitle:
			"Sistema Integrado de Estacionamento Rotativo Inteligente de Japeri",
		stack: [
			"React Native",
			"Node.js",
			"Real-time APIs",
			"Payment Gateway",
			"Dashboard Analytics",
			"UX/UI Design",
			"Google Maps API",
			"Push Notifications",
		],
		summary:
			"Sistema inovador de mobilidade urbana que revolucionou o estacionamento público em Japeri. Features: app móvel com mapa em tempo real, múltiplas formas de pagamento (Pix, cartão), central de monitoramento avançada, programa de fidelidade e parcerias comerciais. Arquitetura escalável com APIs real-time e integração completa com sistemas municipais.",
		url: null,
		featured: true,
		results: [
			"📈 +87% aumento na arrecadação municipal de estacionamento",
			"⏰ -65% redução no tempo médio de busca por vagas",
			"🌱 -40% diminuição nas emissões de CO₂ por circulação urbana",
			"⭐ 4.8/5.0 avaliação média no app (1200+ reviews)",
			"🤝 15+ parcerias comerciais locais estabelecidas",
			"📊 Dashboard com 50+ métricas em tempo real",
		],
	},
	{
		title: "Sistema de Bicicletário Municipal de Japeri",
		stack: ["HTML", "CSS", "JavaScript", "TypeScript", "Node.js"],
		summary:
			"Plataforma completa com DB do zero para controle de bicicletas, usuários, check-in/out e gestão de vagas com foco em usabilidade pública.",
		url: null,
	},
	{
		title: "Pokedex 2.0",
		stack: ["React Native", "API Externa"],
		summary:
			"App inspirado na Pokédex listando tipos, nomes, habilidades e imagens dos Pokémon.",
		url: "https://github.com/matheusaoliv/Pokedex-2.0",
	},
	{
		title: "Megapokedex",
		stack: ["React", "API Externa"],
		summary:
			"Evolução da Pokédex com design moderno e alta performance renderizando dados em tempo real.",
		url: "https://github.com/matheusaoliv/Megapokedex",
	},
	{
		title: "Project: The Last of Us",
		stack: ["React Native"],
		summary:
			"Interface temática com personagens, eventos e cenários. Dados simulados para prototipagem.",
		url: "https://github.com/matheusaoliv/Project-The-Last-of-Us",
	},
];

// ---------- HELPERS ----------
const Section: React.FC<{
	id: string;
	children: React.ReactNode;
	className?: string;
}> = ({ id, children, className = "" }) => (
	<section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const Anchor: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
	<a href={href} className="text-sm md:text-base px-3 py-2 rounded-xl hover:bg-primary/10 transition">
		{children}
	</a>
);

// Animated counter
const AnimatedCounter: React.FC<{ value: string; suffix?: string; delay?: number }> = ({
	value, suffix = "", delay = 0
}) => {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true });
	const numericValue = parseInt(value.replace(/[^\d]/g, ''));

	useEffect(() => {
		if (isInView) {
			setTimeout(() => {
				const timer = setInterval(() => {
					setCount((prev) => {
						if (prev >= numericValue) {
							clearInterval(timer);
							return numericValue;
						}
						return prev + Math.ceil((numericValue - prev) / 10);
					});
				}, 50);
			}, delay);
		}
	}, [isInView, numericValue, delay]);

	return (
		<span ref={ref} className="font-bold">
			{value.includes('+') ? '+' : ''}{value.includes('-') ? '-' : ''}{count}{suffix}
		</span>
	);
};

// Interactive card
const InteractiveCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number; magneticEffect?: boolean; }> = ({ children, className = "", delay = 0, magneticEffect = false }) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
		const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
		setMousePosition({ x: x * 20, y: y * 20 });
	};

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay, type: "spring", stiffness: 80 }}
			whileHover={{
				scale: 1.02,
				rotateX: magneticEffect ? mousePosition.y * -0.3 : 0,
				rotateY: magneticEffect ? mousePosition.x * 0.3 : 0,
				transition: { type: "spring", stiffness: 300, damping: 20 }
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				setMousePosition({ x: 0, y: 0 });
			}}
			className={`group rounded-3xl border-white/10 bg-white/5 overflow-hidden transition-all duration-300 ${className}`}
			style={{
				transformStyle: 'preserve-3d',
				boxShadow: isHovered
					? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
					: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
			}}
		>
			{/* Subtle glow effect */}
			{isHovered && (
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-3xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				/>
			)}
			<div className="relative">{children}</div>
		</motion.div>
	);
};

// Ripple Button
const RippleButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string; href?: string; }> = ({ children, onClick, className = "", href }) => {
	const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

	const handleClick = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const newRipple = { x, y, id: Date.now() };
		setRipples(prev => [...prev, newRipple]);
		setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 600);
		if (onClick) onClick();
	};

	const buttonContent = (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleClick}
			className={`relative overflow-hidden ${className}`}
		>
			{children}
			{ripples.map(ripple => (
				<motion.span
					key={ripple.id}
					className="absolute rounded-full bg-white/30 pointer-events-none"
					initial={{ scale: 0, opacity: 1 }}
					animate={{ scale: 4, opacity: 0 }}
					transition={{ duration: 0.6 }}
					style={{ left: ripple.x - 10, top: ripple.y - 10, width: 20, height: 20 }}
				/>
			))}
		</motion.button>
	);

	if (href) return <a href={href} target="_blank" rel="noreferrer">{buttonContent}</a>;
	return buttonContent;
};

// Background Pattern
const BackgroundPattern: React.FC = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
		<svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
			<defs>
				<pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
					<circle cx="5" cy="5" r="0.5" fill="url(#gradient)" />
				</pattern>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.3 }} />
					<stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0.1 }} />
				</linearGradient>
			</defs>
			<rect width="100%" height="100%" fill="url(#dots)" />
		</svg>
	</div>
);

// Floating Elements
const FloatingElements: React.FC = () => (
	<div className="fixed inset-0 pointer-events-none -z-10">
		{[...Array(6)].map((_, i) => (
			<motion.div
				key={i}
				className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full opacity-20"
				animate={{ x: [0, Math.random() * 100, 0], y: [0, Math.random() * 100, 0], scale: [1, 1.5, 1] }}
				transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
				style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
			/>
		))}
	</div>
);

// Skill Category Card (para remover hook dentro do map)
interface SkillCategory {
	title: string;
	icon: string;
	skills: string[];
}
const SkillCategoryCard: React.FC<{ category: SkillCategory; delay: number }> = ({ category, delay }) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<InteractiveCard delay={delay} magneticEffect className="cursor-pointer">
			<div className="p-6" onClick={() => setExpanded(e => !e)}>
				<div className="flex items-center gap-3 mb-4">
					<motion.span className="text-2xl" animate={{ rotate: expanded ? 360 : 0 }} transition={{ duration: 0.5 }}>
						{category.icon}
					</motion.span>
					<h3 className="text-lg font-semibold text-slate-200">{category.title}</h3>
				</div>
				<motion.div className="space-y-2" animate={{ height: expanded ? "auto" : "120px" }} style={{ overflow: "hidden" }}>
					{category.skills.map((skill, i) => (
						<motion.div
							key={skill}
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: delay + i * 0.02 }}
							whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", transition: { duration: 0.2 } }}
							className="text-sm text-slate-300 bg-white/5 rounded-lg px-3 py-2 border border-white/5 transition-all cursor-pointer"
						>
							{skill}
						</motion.div>
					))}
				</motion.div>
				<motion.div className="mt-3 text-xs text-slate-400 flex items-center justify-center gap-1" animate={{ opacity: expanded ? 0 : 1 }}>
					<span>Click to expand</span>
					<motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1 }}>↕️</motion.div>
				</motion.div>
			</div>
		</InteractiveCard>
	);
};

// ---------- ROOT COMPONENT ----------
export default function PortfolioUX() {
	const { scrollYProgress } = useScroll();
	const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
	const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
			<motion.div
				style={{ scaleX }}
				className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 z-50"
			/>
			<FloatingElements />
			<div className="pointer-events-none fixed inset-0 -z-10">
				<motion.div
					style={{ y: y1 }}
					className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl bg-cyan-600/20 animate-pulse"
				/>
				<motion.div
					style={{ y: y2 }}
					className="absolute top-1/3 -left-24 w-96 h-96 rounded-full blur-3xl bg-indigo-600/20 animate-[pulse_6s_ease-in-out_infinite]"
				/>
				<motion.div
					style={{ y: y3 }}
					className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl bg-purple-600/15 animate-[pulse_8s_ease-in-out_infinite]"
				/>
			</div>
			<BackgroundPattern />

			{/* NAVBAR */}
			<nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 border-b border-white/10">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="size-9 grid place-content-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-indigo-500/20">
							<Sparkles className="size-5" />
						</div>
						<span className="font-semibold tracking-tight">
							{NAME.split(" ")[0]} • UX & Dev Web
						</span>
					</div>
					<div className="hidden md:flex items-center">
						<Anchor href="#inicio">Início</Anchor>
						<Anchor href="#sobre">Sobre</Anchor>
						<Anchor href="#skills">Skills</Anchor>
						<Anchor href="#certificacoes">Qualificações</Anchor>
						<Anchor href="#projetos">Projetos</Anchor>
						<Anchor href="#contato">Contato</Anchor>
					</div>
				</div>
			</nav>

			{/* HERO */}
			<Section id="inicio" className="relative">
				<div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
					>
						Desenvolvedor Full Stack que cria{" "}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
							sistemas inovadores
						</span>{" "}
						com impacto real.
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.6 }}
						className="mt-5 text-lg md:text-xl text-slate-300 max-w-3xl"
					>
						Sou {NAME}, {CITY}. Estudante de Ciência da Computação (5º período –
						Estácio). Uno pesquisa UX + execução técnica para criar produtos que
						impressionam recrutadores e encantam usuários.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="mt-8 flex flex-wrap gap-3"
					>
						<RippleButton
							href="#projetos"
							className="inline-flex items-center justify-center gap-2 rounded-2xl text-base h-12 px-6 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
						>
							<Rocket className="size-5" /> Ver Projetos
						</RippleButton>
						<RippleButton
							href="#contato"
							className="inline-flex items-center justify-center gap-2 rounded-2xl text-base h-12 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 hover:shadow-lg"
						>
							<ArrowRight className="size-5" /> Entrar em Contato
						</RippleButton>
					</motion.div>
				</div>
			</Section>

			{/* SOBRE */}
			<Section id="sobre" className="relative">
				<div className="max-w-6xl mx-auto px-4 py-20">
					<div className="grid md:grid-cols-3 gap-8">
						<InteractiveCard className="md:col-span-2" magneticEffect>
							<Card className="border-none bg-transparent">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-2xl">
										<Layout className="size-5" /> Sobre Mim
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4 text-slate-300">
									<p>
										Desenvolvedor Full Stack com sólida experiência em soluções
										práticas e inovação tecnológica. Atualmente estagiando na
										Prefeitura Municipal de Japeri, onde lidero o desenvolvimento
										de sistemas públicos de alto impacto, como o SERI - Smart
										Parking, que revolucionou a mobilidade urbana local.
									</p>
									<p className="text-sm">
										<strong>Experiência Atual:</strong> Desenvolvedor Full Stack,
										Analista de Sistemas e Especialista em Suporte TI na Prefeitura
										de Japeri. Responsável por projetar, desenvolver e implementar
										soluções tecnológicas que impactam diretamente a vida de
										milhares de cidadãos.
									</p>
									<div className="flex flex-wrap gap-2">
										<Badge
											variant="secondary"
											className="rounded-xl"
										>
											Estácio – Ciência da Computação (5º período)
										</Badge>
										<Badge variant="secondary" className="rounded-xl">
											{CITY}
										</Badge>
									</div>
								</CardContent>
							</Card>
						</InteractiveCard>
						<InteractiveCard delay={0.1} magneticEffect>
							<Card className="border-none bg-transparent">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-2xl">
										<Wrench className="size-5" /> Diferenciais
									</CardTitle>
								</CardHeader>
								<CardContent className="text-slate-300">
									<ul className="space-y-3 list-none">
										{[
											{
												icon: "🎯",
												title: "UX Strategy",
												desc: "Processo completo de pesquisa, ideação, prototipagem e testes de usabilidade",
											},
											{
												icon: "⚙️",
												title: "Technical Excellence",
												desc: "Arquitetura escalável, CI/CD, documentação técnica e boas práticas",
											},
											{
												icon: "🚀",
												title: "Project Leadership",
												desc: "Gestão ágil, comunicação com stakeholders e entrega de resultados mensuráveis",
											},
											{
												icon: "🌍",
												title: "Public Impact",
												desc: "Experiência em projetos governamentais com impacto social e urbano",
											},
										].map((item, index) => (
											<motion.li
												key={item.title}
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{ delay: index * 0.1 }}
												className="flex items-start gap-2"
											>
												<span className="text-cyan-400 text-lg">
													{item.icon}
												</span>
												<div>
													<strong>{item.title}:</strong> {item.desc}
												</div>
											</motion.li>
										))}
									</ul>
								</CardContent>
							</Card>
						</InteractiveCard>
					</div>
				</div>
			</Section>

			{/* SKILLS */}
			<Section id="skills" className="relative">
				<div className="max-w-6xl mx-auto px-4 py-20">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
							<Cpu className="size-7" /> Expertise Técnica
						</h2>
					</motion.div>

					{/* CATEGORIAS DE SKILLS */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{skillsCategories.map((c, i) => (
								<SkillCategoryCard key={c.title} category={c} delay={i * 0.05} />
							))}
						</div>
					</motion.div>

					{/* SOFT SKILLS */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mt-16"
					>
						<h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
							<Users className="size-6" /> Soft Skills & Liderança
						</h3>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{softSkills.map((skill, index) => (
								<InteractiveCard
									key={skill.title}
									delay={index * 0.07}
									magneticEffect
								>
									<div className="p-6">
										<div className="flex items-center gap-3 mb-3">
											<motion.div
												whileHover={{ rotate: 15, scale: 1.2 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												<skill.icon className="size-6 text-cyan-400" />
											</motion.div>
											<h4 className="text-lg font-semibold text-slate-200">
												{skill.title}
											</h4>
										</div>
										<p className="text-sm text-slate-300 mb-3">
											{skill.description}
										</p>
										<div className="space-y-1">
											{skill.examples.map((example, i) => (
												<motion.div
													key={i}
													initial={{ opacity: 0, x: -10 }}
													whileInView={{ opacity: 1, x: 0 }}
													viewport={{ once: true }}
													transition={{
														delay: (index * 0.07) + (i * 0.05),
													}}
													whileHover={{ x: 5, transition: { duration: 0.2 } }}
													className="text-xs text-slate-400 bg-white/5 rounded-lg px-2 py-1 cursor-pointer"
												>
													• {example}
												</motion.div>
											))}
										</div>
									</div>
								</InteractiveCard>
							))}
						</div>
					</motion.div>

					{/* CONHECIMENTOS ESPECÍFICOS */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mt-16"
					>
						<h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
							<Globe className="size-6" /> Conhecimentos Especializados
						</h3>
						<div className="grid md:grid-cols-2 gap-6">
							{specializedKnowledge.map((k, i) => (
								<InteractiveCard key={k.title} delay={i * 0.1} magneticEffect>
									<div className="p-6">
										<div className="flex items-center gap-3 mb-4">
											<motion.div
												className={`p-2 rounded-xl bg-gradient-to-r ${k.color}`}
												whileHover={{ rotate: 360, scale: 1.1 }}
												transition={{ duration: 0.5 }}
											>
												<k.icon className="size-5 text-white" />
											</motion.div>
											<h4 className="text-lg font-semibold text-slate-200">
												{k.title}
											</h4>
										</div>
										<p className="text-sm text-slate-300 mb-4">
											{k.description}
										</p>
										<div className="space-y-2">
											{k.achievements.map((ach, j) => (
												<motion.div
													key={j}
													initial={{ opacity: 0, y: 10 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true }}
													transition={{ delay: (i * 0.1) + (j * 0.05) }}
													whileHover={{
														scale: 1.02,
														backgroundColor: "rgba(255,255,255,0.1)",
														transition: { duration: 0.2 },
													}}
													className="text-sm text-slate-400 bg-white/5 rounded-lg px-3 py-2 cursor-pointer transition-all"
												>
													{ach}
												</motion.div>
											))}
										</div>
									</div>
								</InteractiveCard>
							))}
						</div>
					</motion.div>
				</div>
			</Section>

			{/* CERTIFICACOES */}
			<Section id="certificacoes" className="relative">
				<div className="max-w-6xl mx-auto px-4 py-20">
					<motion.h2
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
						className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3"
					>
						<GraduationCap className="size-7" /> Qualificações & Certificações
					</motion.h2>
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						<h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
							<Award className="size-6 text-yellow-400" /> Certificações
							Profissionais Relevantes
						</h3>
						<div className="grid md:grid-cols-2 gap-6">
							{relevantCertifications.map((cat, i) => (
								<motion.div
									key={cat.category}
									initial={{ opacity: 0, y: 12 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className="rounded-3xl border border-white/10 bg-white/5 p-6"
								>
									<div className="flex items-center gap-3 mb-4">
										<div
											className={`p-2 rounded-xl bg-gradient-to-r ${cat.color}`}
										>
											<cat.icon className="size-5 text-white" />
										</div>
										<h4 className="text-lg font-semibold text-slate-200">
											{cat.category}
										</h4>
									</div>
									<div className="space-y-4">
										{cat.certs.map((cert, j) => (
											<motion.div
												key={cert.name}
												initial={{ opacity: 0, x: -10 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{
													delay: (i * 0.1) + (j * 0.05),
												}}
												className="bg-white/5 rounded-xl p-4 border border-white/5"
											>
												<h5 className="font-semibold text-slate-200 mb-2">
													{cert.name}
												</h5>
												<p className="text-sm text-slate-300 mb-2">
													{cert.description}
												</p>
												<div className="flex items-center gap-2">
													<Badge
														className={`rounded-xl bg-gradient-to-r ${cat.color} text-white`}
													>
														Destaque
													</Badge>
													<span className="text-xs text-slate-400">
														{cert.highlight}
													</span>
												</div>
											</motion.div>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
					<div className="grid md:grid-cols-2 gap-6">
						<Card className="rounded-3xl border-white/10 bg-white/5">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-xl">
									<GraduationCap className="size-5 text-cyan-400" /> Formação
									Acadêmica
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start gap-3">
									<Badge className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600">
										Atual
									</Badge>
									<div>
										<p className="font-semibold text-slate-200">
											Bacharelado em Ciência da Computação
										</p>
										<p className="text-sm text-slate-300">
											Universidade Estácio de Sá • 5º Período
										</p>
										<p className="text-xs text-slate-400">
											Previsão de conclusão: 2025
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="rounded-3xl border-white/10 bg-white/5">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-xl">
									<Badge className="size-5 text-cyan-400" /> Certificações Básicas
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{basicCerts.map((c, i) => (
									<motion.div
										key={c}
										initial={{ opacity: 0, y: 12 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.04 }}
										className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/5"
									>
										<Badge className="rounded-xl" variant="secondary">
											{i + 1}
										</Badge>
										<p className="text-sm text-slate-300">{c}</p>
									</motion.div>
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</Section>

			{/* PROJETOS */}
			<Section id="projetos" className="relative">
				<div className="max-w-6xl mx-auto px-4 py-20">
					<motion.h2
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
						className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
					>
						<Rocket className="size-7" /> Projetos Selecionados
					</motion.h2>
					<div className="grid md:grid-cols-2 gap-6">
						{projects.map((p, i) => (
							<div key={p.title} className={p.featured ? "md:col-span-2" : ""}>
								<InteractiveCard
									delay={i * 0.07}
									magneticEffect
									className={`overflow-hidden ${
										p.featured
											? "border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5"
											: ""
									}`}
								>
									<Card className="border-none bg-transparent">
										<CardHeader className="pb-2">
											<CardTitle className="flex items-center justify-between gap-3 text-xl">
												<div className="flex flex-col items-start gap-2">
													<div className="flex items-center gap-2">
														{p.featured && (
															<motion.div
																initial={{ scale: 0 }}
																whileInView={{ scale: 1 }}
																viewport={{ once: true }}
																transition={{
																	delay: 0.3,
																	type: "spring",
																	stiffness: 200,
																}}
															>
																<Badge className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
																	✨ Projeto Destaque
																</Badge>
															</motion.div>
														)}
														<span>{p.title}</span>
													</div>
													{p.subtitle && (
														<span className="text-sm text-slate-400 font-normal">
															{p.subtitle}
														</span>
													)}
												</div>
												<div className="flex gap-2 flex-wrap">
													{p.stack.map((t, techIndex) => (
														<motion.div
															key={t}
															initial={{ opacity: 0, scale: 0 }}
															whileInView={{ opacity: 1, scale: 1 }}
															viewport={{ once: true }}
															transition={{
																delay: (i * 0.07) + (techIndex * 0.05),
															}}
															whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
														>
															<Badge
																variant="secondary"
																className="rounded-xl cursor-pointer"
															>
																{t}
															</Badge>
														</motion.div>
													))}
												</div>
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-slate-300 mb-4">{p.summary}</p>
											{p.results && (
												<div className="mb-4">
													<h4 className="text-sm font-semibold text-slate-200 mb-2">
														Resultados Alcançados:
													</h4>
													<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
														{p.results.map((result, idx) => (
															<motion.div
																key={idx}
																initial={{ opacity: 0, scale: 0.8 }}
																whileInView={{ opacity: 1, scale: 1 }}
																viewport={{ once: true }}
																transition={{ delay: idx * 0.1 }}
																whileHover={{
																	scale: 1.05,
																	backgroundColor: "rgba(6, 182, 212, 0.1)",
																	transition: { duration: 0.2 },
																}}
																className="text-sm text-slate-300 bg-white/5 rounded-lg px-3 py-2 cursor-pointer transition-all border border-transparent hover:border-cyan-500/30"
															>
																{result.includes("%") ||
																result.includes("+") ||
																result.includes("-") ? (
																	<span>
																		{result
																			.split(/([+-]?\d+%?)/)
																			.map((part, partIdx) =>
																				/[+-]?\d+%?/.test(part) ? (
																					<AnimatedCounter
																						key={partIdx}
																						value={part}
																						delay={idx * 100}
																					/>
																				) : (
																					part
																				)
																			)}
																	</span>
																) : (
																	result
																)}
															</motion.div>
														))}
													</div>
												</div>
											)}
											<div className="flex items-center justify-between">
												{p.url ? (
													<RippleButton
														href={p.url}
														className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300"
													>
														<Github className="size-4" /> Repositório
													</RippleButton>
												) : (
													<div className="text-slate-400 text-sm flex items-center gap-2">
														<LinkIcon className="size-4" />{" "}
														{p.featured
															? "Projeto municipal (código privado)"
															: "Repositório privado / não disponível"}
													</div>
												)}
												<motion.div
													whileHover={{ scale: 1.05 }}
													className="text-xs text-slate-400"
												>
													{p.featured
														? "Sistema em produção na Prefeitura de Japeri"
														: "Case: problema → processo → solução → resultado"}
												</motion.div>
											</div>
										</CardContent>
									</Card>
								</InteractiveCard>
							</div>
						))}
					</div>
				</div>
			</Section>

			{/* CONTATO */}
			<Section id="contato" className="relative">
				<div className="max-w-6xl mx-auto px-4 py-20">
					<motion.h2
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
						className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3"
					>
						<Sparkles className="size-7" /> Vamos construir algo extraordinário?
					</motion.h2>

					<div className="grid md:grid-cols-3 gap-6">
						<InteractiveCard magneticEffect>
							<Card className="border-none bg-transparent">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-xl">
										<motion.div
											animate={{ rotate: [0, 10, -10, 0] }}
											transition={{
												repeat: Infinity,
												duration: 2,
												ease: "easeInOut",
											}}
										>
											<Phone className="size-5" />
										</motion.div>
										WhatsApp
									</CardTitle>
								</CardHeader>
								<CardContent className="flex gap-3">
									{WHATS.map((w) => (
										<RippleButton
											key={w}
											href={`https://wa.me/${w}`}
											className="rounded-2xl bg-green-600 hover:bg-green-700 text-white px-4 py-2"
										>
											{w.replace(/(\d{2})(\d{5})(\d{4})/, "+$1 $2-$3")}
										</RippleButton>
									))}
								</CardContent>
							</Card>
						</InteractiveCard>

						<InteractiveCard delay={0.1} magneticEffect>
							<Card className="border-none bg-transparent">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-xl">
										<motion.div
											animate={{ y: [0, -2, 0] }}
											transition={{ repeat: Infinity, duration: 1.5 }}
										>
											<Mail className="size-5" />
										</motion.div>
										E-mail
									</CardTitle>
								</CardHeader>
								<CardContent>
									<RippleButton
										href={`mailto:${EMAIL}`}
										className="rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2"
									>
										{EMAIL}
									</RippleButton>
								</CardContent>
							</Card>
						</InteractiveCard>

						<InteractiveCard delay={0.2} magneticEffect>
							<Card className="border-none bg-transparent">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-xl">
										<motion.div
											whileHover={{ scale: 1.2, rotate: 360 }}
											transition={{ duration: 0.5 }}
										>
											<Github className="size-5" />
										</motion.div>
										GitHub
									</CardTitle>
								</CardHeader>
								<CardContent>
									<RippleButton
										href={GITHUB}
										className="rounded-2xl bg-gray-800 hover:bg-gray-900 text-white px-4 py-2"
									>
										{GITHUB.replace("https://", "")}
									</RippleButton>
								</CardContent>
							</Card>
						</InteractiveCard>
					</div>
				</div>
			</Section>

			{/* FOOTER */}
			<footer className="border-t border-white/10">
				<div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
					<p>© {new Date().getFullYear()} {NAME}. Todos os direitos reservados.</p>
					<p className="opacity-80">O site respeita <span className="underline">prefers-reduced-motion</span> e boas práticas de acessibilidade.</p>
				</div>
			</footer>
		</div>
	);
}
