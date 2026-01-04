'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Film, Library, MessageCircle, Zap, Cpu, ArrowRight, Sparkles, ExternalLink, Cloud, Activity, TicketCheck, Server, Container, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
    const services = [
        {
            title: "Artigos & Blog",
            description: "Sistema de gestão de conteúdo desenvolvido em Django + Next.js com autenticação JWT, editor WYSIWYG (TinyMCE), sistema de categorias e tags, versionamento de artigos, modo público/privado, filtros avançados e API RESTful com documentação OpenAPI automática.",
            url: "/artigos",
            icon: <BookOpen className="w-8 h-8" />,
            internal: true,
            badge: "Módulo Django",
            color: "var(--django-green-primary)"
        },
        {
            title: "Jellyfin",
            description: "Servidor de mídia open-source com streaming adaptativo (HLS/DASH), transcodificação em tempo real, sincronização multi-dispositivo, legendas personalizadas, controle parental, detecção automática de metadata (TMDB/TVDB), apps nativos (Android/iOS/TV) e reprodução offline.",
            url: process.env.NEXT_PUBLIC_URL_JELLYFIN || "https://jellyfin.seudominio.com",
            icon: <Film className="w-8 h-8" />,
            internal: false,
            color: "#AA5CC3"
        },
        {
            title: "Komga",
            description: "Servidor de biblioteca digital especializado em CBZ/CBR/PDF/EPUB com leitor web responsivo, sincronização de progresso, gestão de coleções e séries, extração automática de metadados, suporte a OPDS (para apps externos), gestão multi-usuário e API REST completa.",
            url: process.env.NEXT_PUBLIC_URL_KOMGA || "https://komga.seudominio.com",
            icon: <Library className="w-8 h-8" />,
            internal: false,
            color: "#F97316"
        },
        {
            title: "Evolution API",
            description: "API não-oficial do WhatsApp construída sobre Baileys, permitindo gerenciamento de múltiplas instâncias, envio/recebimento de mensagens (texto, mídia, áudio, documentos), webhooks para eventos em tempo real, QR Code auth, grupos, status, e integração via REST/Websocket.",
            url: process.env.NEXT_PUBLIC_URL_EVOLUTION || "https://evolution.seudominio.com",
            icon: <Cpu className="w-8 h-8" />,
            internal: false,
            color: "#10B981"
        },
        {
            title: "Chatwoot",
            description: "Plataforma de atendimento omnichannel com inbox unificado (WhatsApp, Telegram, Email, Webchat), automações com chatbots, macros de respostas, atribuição inteligente de tickets, relatórios analíticos, integrações (Slack, Webhooks), CRM embutido e gestão de equipes.",
            url: process.env.NEXT_PUBLIC_URL_CHATWOOT || "https://chatwoot.seudominio.com",
            icon: <MessageCircle className="w-8 h-8" />,
            internal: false,
            color: "#06B6D4"
        },
        {
            title: "n8n",
            description: "Plataforma de automação de workflows (no-code/low-code) com 400+ integrações nativas (Google, AWS, Databases, APIs), triggers baseados em eventos/webhook/schedule, transformação de dados com JavaScript, execuções condicionais, loops, tratamento de erros e versionamento de fluxos.",
            url: process.env.NEXT_PUBLIC_URL_N8N || "https://n8n.seudominio.com",
            icon: <Zap className="w-8 h-8" />,
            internal: false,
            color: "#F59E0B"
        },
        {
            title: "Nextcloud",
            description: "Plataforma de armazenamento em nuvem auto-hospedada com sincronização de arquivos multi-dispositivo, compartilhamento Samba/SMB integrado (fonte de mídia para Jellyfin e Komga), calendário, contatos, chat, colaboração em documentos (OnlyOffice/Collabora), criptografia E2E e apps extensíveis.",
            url: process.env.NEXT_PUBLIC_URL_NEXTCLOUD || "https://nextcloud.seudominio.com",
            icon: <Cloud className="w-8 h-8" />,
            internal: false,
            color: "#0082C9"
        },
        {
            title: "GLPI",
            description: "Sistema ITSM (IT Service Management) open-source para gestão de ativos de TI, inventário automatizado (via FusionInventory), help desk com ticketing multicanal, SLA/OLA, base de conhecimento, gestão de contratos, reservas de equipamentos, CMDB integrado e relatórios personalizáveis.",
            url: process.env.NEXT_PUBLIC_URL_GLPI || "https://glpi.seudominio.com",
            icon: <TicketCheck className="w-8 h-8" />,
            internal: false,
            color: "#E74C3C"
        },
        {
            title: "Zabbix",
            description: "Plataforma de monitoramento empresarial para infraestrutura de TI com coleta de métricas em tempo real (CPU, RAM, disco, rede), triggers inteligentes, alertas via Email/SMS/Slack, dashboards customizáveis, auto-discovery de dispositivos, templates prontos, API REST e integração com Grafana.",
            url: process.env.NEXT_PUBLIC_URL_ZABBIX || "https://zabbix.seudominio.com",
            icon: <Activity className="w-8 h-8" />,
            internal: false,
            color: "#D40000"
        },
        {
            title: "aaPanel",
            description: "Painel de controle de servidor web open-source (alternativa ao cPanel) para gestão de sites, bancos de dados MySQL/PostgreSQL, FTP, DNS, SSL (Let's Encrypt), backups automáticos, monitoramento de recursos, firewall integrado, suporte a NGINX/Apache e interface multi-idioma.",
            url: process.env.NEXT_PUBLIC_URL_AAPANEL || "https://aapanel.seudominio.com",
            icon: <Server className="w-8 h-8" />,
            internal: false,
            color: "#1890FF"
        },
        {
            title: "Portainer",
            description: "Interface web para gerenciamento de containers Docker e Kubernetes com visualização de stacks, volumes, networks e images, deploy via UI ou Docker Compose, logs em tempo real, console interativo, controle de recursos (CPU/RAM limits), RBAC multi-usuário, templates de apps e integração com registries.",
            url: process.env.NEXT_PUBLIC_URL_PORTAINER || "https://portainer.seudominio.com",
            icon: <Container className="w-8 h-8" />,
            internal: false,
            color: "#13BEF9"
        }
    ];

    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-scroll suave
    useEffect(() => {
        const startAutoScroll = () => {
            scrollIntervalRef.current = setInterval(() => {
                if (carouselRef.current) {
                    const container = carouselRef.current;
                    const maxScroll = container.scrollWidth / 2; // Metade porque temos 2 cópias

                    if (container.scrollLeft >= maxScroll - 1) {
                        // Reset para o início (loop infinito)
                        container.scrollLeft = 0;
                    } else {
                        container.scrollLeft += 1;
                    }
                }
            }, 30);
        };

        startAutoScroll();

        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, []);

    const handlePrev = () => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    };

    const handleNext = () => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    };

    return (
        <>
            <style jsx global>{`
        .carousel-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
        
        .logo-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>

            <div className="min-h-screen">
                <section
                    className="relative py-20 lg:py-32 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%)' }}
                >
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">

                            {/* Carousel com Botões */}
                            <div className="mb-12">
                                <p className="text-sm font-semibold mb-4" style={{ color: 'var(--muted-foreground)' }}>
                                    SERVIÇOS INTEGRADOS
                                </p>

                                <div style={{ position: 'relative' }}>
                                    {/* Botão Anterior */}
                                    <button
                                        onClick={handlePrev}
                                        style={{
                                            position: 'absolute',
                                            left: '-20px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            zIndex: 10,
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: 'var(--django-green-primary)',
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(68, 183, 139, 0.3)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--django-green-link)';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'var(--django-green-primary)';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                                        }}
                                        aria-label="Anterior"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>

                                    {/* Container do Carousel */}
                                    <div
                                        ref={carouselRef}
                                        className="carousel-container"
                                        style={{
                                            width: '100%',
                                            overflowX: 'scroll',
                                            overflowY: 'hidden',
                                            scrollBehavior: 'auto',
                                            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: '2rem',
                                                padding: '1rem 0',
                                                width: 'max-content'
                                            }}
                                        >
                                            {/* Primeira cópia */}
                                            {services.map((service, index) => (
                                                <a
                                                    key={`logo-${index}`}
                                                    href={service.url}
                                                    target={service.internal ? "_self" : "_blank"}
                                                    rel={service.internal ? undefined : "noopener noreferrer"}
                                                    title={service.title}
                                                    className="logo-item"
                                                    style={{
                                                        color: service.color,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                        minWidth: '100px',
                                                        maxWidth: '100px',
                                                        flexShrink: 0,
                                                        padding: '1rem',
                                                        borderRadius: '0.75rem',
                                                        background: 'var(--card-bg)',
                                                        border: '1px solid var(--border)',
                                                        transition: 'all 0.3s ease',
                                                        cursor: 'pointer',
                                                        textDecoration: 'none',
                                                        userSelect: 'none'
                                                    }}
                                                    onDragStart={(e) => e.preventDefault()}
                                                >
                                                    <div style={{ pointerEvents: 'none' }}>
                                                        {service.icon}
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        textAlign: 'center',
                                                        pointerEvents: 'none'
                                                    }}>{service.title}</span>
                                                </a>
                                            ))}

                                            {/* Segunda cópia para loop infinito */}
                                            {services.map((service, index) => (
                                                <a
                                                    key={`logo-duplicate-${index}`}
                                                    href={service.url}
                                                    target={service.internal ? "_self" : "_blank"}
                                                    rel={service.internal ? undefined : "noopener noreferrer"}
                                                    title={service.title}
                                                    className="logo-item"
                                                    style={{
                                                        color: service.color,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                        minWidth: '100px',
                                                        maxWidth: '100px',
                                                        flexShrink: 0,
                                                        padding: '1rem',
                                                        borderRadius: '0.75rem',
                                                        background: 'var(--card-bg)',
                                                        border: '1px solid var(--border)',
                                                        transition: 'all 0.3s ease',
                                                        cursor: 'pointer',
                                                        textDecoration: 'none',
                                                        userSelect: 'none'
                                                    }}
                                                    onDragStart={(e) => e.preventDefault()}
                                                >
                                                    <div style={{ pointerEvents: 'none' }}>
                                                        {service.icon}
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        textAlign: 'center',
                                                        pointerEvents: 'none'
                                                    }}>{service.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Botão Próximo */}
                                    <button
                                        onClick={handleNext}
                                        style={{
                                            position: 'absolute',
                                            right: '-20px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            zIndex: 10,
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: 'var(--django-green-primary)',
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(68, 183, 139, 0.3)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--django-green-link)';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'var(--django-green-primary)';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                                        }}
                                        aria-label="Próximo"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'var(--django-green-primary)', color: 'white' }}>
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm font-medium">Infraestrutura Profissional</span>
                            </div>

                            <h1 className="heading-1 max-w-3xl mx-auto">
                                Arquitetura{' '}
                                <span style={{ color: 'var(--django-green-primary)' }}>Moderna</span>
                            </h1>

                            <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                                Todos os serviços rodando em containers Docker, com NGINX como reverse proxy,
                                certificados SSL Let's Encrypt e banco de dados PostgreSQL para máxima confiabilidade.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
                                <div className="p-6 rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                                    <div className="text-5xl font-bold mb-2" style={{ color: 'var(--django-green-primary)' }}>11</div>
                                    <div className="font-semibold text-lg">Serviços Ativos</div>
                                </div>
                                <div className="p-6 rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                                    <div className="text-5xl font-bold mb-2" style={{ color: 'var(--django-green-primary)' }}>100%</div>
                                    <div className="font-semibold text-lg">Auto-hospedado</div>
                                </div>
                                <div className="p-6 rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                                    <div className="text-5xl font-bold mb-2" style={{ color: 'var(--django-green-primary)' }}>24/7</div>
                                    <div className="font-semibold text-lg">Disponibilidade</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                                <Link href="/artigos" className="btn btn-primary flex items-center gap-2 px-8 py-3 text-base">
                                    Explorar Artigos
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <a href="#servicos" className="btn btn-outline flex items-center gap-2 px-8 py-3 text-base">
                                    Ver Serviços
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--django-green-primary)' }} />
                    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--django-green-link)' }} />
                </section>

                <section id="servicos" className="py-20">
                    <div className="container-custom">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h2 className="heading-2">Serviços Integrados</h2>
                                <p className="body-large mt-2" style={{ color: 'var(--muted-foreground)' }}>
                                    Acesse suas ferramentas prontas e rodando em containers
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, index) => (
                                <a
                                    key={index}
                                    href={service.url}
                                    target={service.internal ? "_self" : "_blank"}
                                    rel={service.internal ? undefined : "noopener noreferrer"}
                                    className="card group p-8 flex flex-col h-full transition-all duration-300"
                                    style={{ borderLeft: `4px solid ${service.color}` }}
                                >
                                    <div className="mb-6 p-3 w-fit rounded-lg transition-all duration-300" style={{ background: 'var(--muted)', color: service.color }}>
                                        {service.icon}
                                    </div>

                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="heading-3 mb-0">{service.title}</h3>
                                        {service.badge && (
                                            <span className="badge text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: 'var(--django-green-primary)', color: 'white' }}>
                                                {service.badge}
                                            </span>
                                        )}
                                    </div>

                                    <p className="flex-grow mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                                        {service.description}
                                    </p>

                                    <div className="flex items-center text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: service.color }}>
                                        {service.internal ? 'Acessar módulo' : 'Abrir serviço'}{' '}
                                        {service.internal ? (
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        ) : (
                                            <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="py-12 text-center" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
                    <p className="text-sm">© {new Date().getFullYear()} - Todos os serviços operacionais e integrados</p>
                </footer>
            </div>
        </>
    );
}
