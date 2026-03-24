/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Dog, 
  ShoppingBag, 
  MessageCircle, 
  Instagram, 
  Music2, 
  Youtube,
  Heart, 
  Award, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  X, 
  Menu,
  Star,
  PlayCircle,
  ArrowRight,
  Quote,
  PawPrint,
  Eye,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * GUÍA DE EDICIÓN RÁPIDA PARA "MANCHAS CAKES"
 * ------------------------------------------
 * 1. LOGO: Buscar componente "Logo" (Línea ~53)
 * 2. NOMBRE DE MARCA: Variable "BRAND_NAME" (Línea ~44)
 * 3. PRODUCTOS: Array "PRODUCTS" (Línea ~72)
 * 4. VIDEO: Variable "TESTIMONIAL_VIDEO_URL" (Línea ~50)
 * 5. WHATSAPP: Variable "WHATSAPP_NUMBER" (Línea ~46)
 * 6. REDES SOCIALES: Variable "SOCIAL_LINKS" (Línea ~48)
 * 7. COLORES: Archivo src/index.css (@theme)
 * 8. PREGUNTAS CHATBOT: Objeto "CHATBOT_STEPS" (Línea ~113)
 * 9. MENSAJES AUTOMÁTICOS: Dentro de "CHATBOT_STEPS" (Línea ~113)
 */

// --- CONFIGURACIÓN GLOBAL ---
const BRAND_NAME = "Manchas Cakes"; // 2. AQUÍ CAMBIAR NOMBRE DE LA MARCA
const WHATSAPP_NUMBER = "51993462996"; // 5. AQUÍ CAMBIAR EL NÚMERO DE WHATSAPP (Sin símbolos, solo números)
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// --- 4. AQUÍ CAMBIAR EL VIDEO DE TESTIMONIOS ---
// Puedes usar un link de YouTube (formato embed) o un archivo local en /images/video.mp4
const TESTIMONIAL_VIDEO_URL = "https://www.youtube.com/embed/pXigVPXqiDM"; 

const SOCIAL_LINKS = { // 6. AQUÍ CAMBIAR REDES SOCIALES
  instagram: "https://www.instagram.com/manchas_cakes?igsh=dmU1bTU0aWJicG01",
  tiktok: "https://vt.tiktok.com/ZSuWnkqyf/",
  youtube: "https://youtube.com/shorts/pXigVPXqiDM?si=GdwAeaqUWxRgraRi",
};

// --- 1. AQUÍ CAMBIAR LOGO ---
/**
 * PARA CAMBIAR TU LOGO:
 * 1. Sube tu logo a 'public/images/logo.png'
 * 2. Si tu logo tiene otro nombre o extensión (ej. .jpg), cámbialo en el 'src' de abajo.
 */
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <img 
        src="/images/logo.png" 
        alt={BRAND_NAME} 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Si la imagen no existe, muestra el icono de perrito por defecto
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
          if (fallback) fallback.classList.remove('hidden');
        }}
      />
      <div className="logo-fallback hidden bg-primary p-2 rounded-full">
        <Dog className="text-white w-6 h-6" />
      </div>
    </div>
    <span className="font-bold text-lg md:text-xl tracking-tight text-slate-800">{BRAND_NAME}</span>
  </div>
);

// --- 3. AQUÍ EDITAR PRODUCTOS ---
/**
 * INSTRUCCIONES PARA EDITAR:
 * 1. Para cambiar una FOTO: Sube tu imagen a la carpeta 'public/images/' y cambia el valor de 'image' por '/images/tu-foto.jpg'.
 * 2. Para editar PRECIO o NOMBRE: Simplemente cambia el texto entre las comillas.
 * 3. Para agregar más productos: Copia un bloque de { ... } y pégalo debajo, cambiando el 'id'.
 */
const PRODUCTS = [
  // --- PACKS ---
  {
    id: 1,
    name: "Pack Mini",
    price: "S/36.00",
    description: "Torta redonda (15 cm), 5 Cookies alrededor, Letrero personalizado, Cualquier temática y 2 Sabores a elegir.",
    category: "Packs",
    image: "/images/pack-mini.png",
    whatsappMessage: "¡Hola! Me interesa el Pack Mini (S/36.00) para mi engreído 🐾"
  },
{
  id: 2,
  name: "Pack Cumple",
  price: "S/45.00",
  description: "Pack Cumple 🎉🐶\n\nIncluye:\n\n• 1/4 kg de torta (forma circular, hueso o huellita)\n• 04 cookies\n• Letrero personalizado\n• Temática a elección\n• 02 sabores a elegir\n\nOpciones adicionales:\n\n• + S/5 vela huellita\n• + S/10 gorro personalizado\n• + S/15 banderín de pared personalizado\n• + S/20 bandana cumpleañera",
  category: "Packs",
  image: "/images/pack-cumple.jpg",
  whatsappMessage: "¡Hola! Me interesa el Pack Cumple (S/45.00) 🎉🐶 ¿Qué temáticas y modelos tienes disponibles?"
},
  {
    id: 3,
  name: "Pack Patudos",
  price: "S/65.00",
  description: "Pack Patudos 🎉🐾\n\nIncluye:\n\n• 01 torta de 1/4 kg (forma circular, hueso o huellita)\n• 04 cookies\n• Letrero personalizado\n• Temática a elección\n• 02 sabores a elegir\n• Bandana cumpleañera reversible (hembra o macho)\n\nOpciones adicionales:\n\n• + S/5 vela huellita\n• + S/10 gorro personalizado\n• + S/15 banderín de pared personalizado\n• + S/20 bandana cumpleañera extra",
    category: "Packs",
    image: "/images/pack-patudos.png",
    whatsappMessage: "¡Hola! Me interesa el Pack Patudos (S/65.00) con la bandana 🐕"
  },
  {
    id: 4,
  name: "Pack Pet",
  price: "S/75.00",
  description: "Pack Pet 🎉🐶\n\nIncluye:\n\n• 01 torta de 1/2 kg (forma circular, hueso o huellita)\n• 02 loncheras personalizadas\n  (incluye 01 paleta de huellita y 02 mini donas)\n• 02 cupcakes\n• Temática a elección\n• 02 sabores a elegir\n\nOpciones adicionales:\n\n• + S/5 vela huellita\n• + S/10 gorro personalizado\n• + S/15 banderín de pared personalizado\n• + S/20 bandana cumpleañera",
    category: "Packs",
    image: "/images/pack-pet.png",
    whatsappMessage: "¡Hola! Quiero pedir el Pack Pet (S/75.00) 🎁"
  },
 {
  id: 5,
  name: "Pack Pet Fest",
  price: "S/89.00",
  description: "Celebra a tu peludo con nuestro Pack Pet Fest 🎉🐶\n\nIncluye:\n\n• 1/2 kg de torta (forma hueso, huella o redonda)\n• 02 loncheras personalizadas (incluye 06 bocaditos)\n• 01 gorro personalizado\n• 02 cupcakes\n• 04 bocaditos mixtos\n• Temática a elección\n• 02 sabores a elegir\n\nOpciones adicionales:\n\n• + S/5 vela huellita\n• + S/10 gorro personalizado\n• + S/15 banderín de pared personalizado\n• + S/20 bandana cumpleañera",
  category: "Packs",
  image: "/images/Pack-Pet-Fest.png",
  whatsappMessage: "¡Hola! Me interesa el Pack Pet Fest (S/89.00) 🎉🐶 ¿Qué temáticas y modelos tienes disponibles?"
},
  {
  id: 11,
  name: "Pack Mini Gatitos",
  price: "S/36.00",
  description: "Pack Mini Gatitos 🐱🎉\n\nIncluye:\n\n• 01 torta redonda (15 cm)\n• 05 cookies alrededor\n• Letrero personalizado\n• Temática a elección\n• 02 sabores a elegir\n\n✨ Diseños especiales para gatitos\n📩 Consulta disponibilidad",
  category: "Packs",
  image: "/images/pack-mini-gatitos.png",
  whatsappMessage: "¡Hola! Me interesa el Pack Mini Gatitos (S/36.00) 🐱🎉 ¿Qué modelos tienes disponibles?"
},
{
  id: 16,
  name: "Pack Manchas",
  price: "S/110.00",
  description: "Pack Manchas 🎉🐶\n\nIncluye:\n\n• 1/2 kg de torta (forma hueso, huella o redonda)\n• 04 loncheras personalizadas (incluye 06 bocaditos)\n• 01 gorro personalizado\n• 04 cupcakes\n• 10 bocaditos mixtos\n• Temática a elección\n• Sabores a elegir\n\nOpciones adicionales:\n\n• + S/5 vela huellita\n• + S/10 gorro personalizado\n• + S/15 banderín de pared personalizado\n• + S/20 bandana cumpleañera\n\n✨ También disponible en torta de 3/4 kg y 1 kg",
  category: "Packs",
  image: "/images/pack-manchas.png",
  whatsappMessage: "¡Hola! Me interesa el Pack Manchas (S/110.00) 🎉🐶 ¿Qué temáticas y tamaños tienes disponibles?"
},
{
  id: 17,
  name: "Catering por Docena",
  price: "Desde S/18.00",
  description: "Catering para eventos 🐶🎉\n\nElige tus opciones por docena:\n\n• Cupcakes grandes – S/35\n• Mini cupcakes – S/28\n• Empanadas – S/30\n• Paletas huellita – S/26\n• Gomitas – S/28\n• Donas – S/24\n• Waffles – S/28\n• Pizza mediana – S/34\n• Mini pizza – S/24\n• Mini galletas – S/18\n• Cookies grandes – S/28\n• Cookies medianas – S/24\n• Mini pies – S/24\n• Hamburguesas – S/33\n\n✨ Perfecto para cumpleaños, eventos y celebraciones para tu peludo.\n\n📩 Puedes combinar productos según tu evento.",
  category: "Catering",
  image: "/images/catering-docena.png",
  whatsappMessage: "¡Hola! Me interesa el catering por docena 🐶🎉 ¿Qué opciones tienes disponibles y cómo puedo combinar mi pedido?"
},
  // --- ACCESORIOS ---
  {
  id: 12,
  name: "Vela Schnauzer Premium con Caja",
  price: "S/22.00",
  description: "Vela Schnauzer 🐶🕯️ con diseño realista y caja incluida.\n\n• Acabado artesanal\n• Ideal para regalo\n• Tamaño: 7 x 11 cm\n\n✨ Perfecta para decorar o sorprender",
  category: "Accesorios",
  image: "/images/vela-schnauzer.png",
  whatsappMessage: "¡Hola! Me interesa la Vela Schnauzer Premium con Caja 🐶🕯️ ¿Tienes otros modelos disponibles?"
},
{
  id: 13,
  name: "Vela Perrito Premium Personalizada",
  price: "S/22.00",
  description: "Vela personalizada 🐶🕯️\n\nDiseñada con la forma de tu raza favorita y acabados artísticos que resaltan cada detalle.\n\nIncluye:\n\n• Vela en forma de perrito\n• Depósito premium con tapa\n• Nombre personalizado de tu mascota\n\nCaracterísticas:\n\n• Diseño artístico y detallado\n• Conserva mejor la fragancia\n• Presentación elegante\n• Ideal para regalo o decoración\n\n✨ Un detalle único que marca la diferencia",
  category: "Accesorios",
  image: "/images/vela-personalizada.png",
  whatsappMessage: "¡Hola! Me interesa la Vela Perrito Premium Personalizada (S/22.00) 🐶🕯️ ¿Puedo elegir raza y nombre?"
},
/*
    {
      id: 7,
      name: "Gorro de Cumpleaños",
      price: "S/10.00",
      description: "Gorro festivo personalizado con el nombre de tu mascota y detalles brillantes.",
      category: "Accesorios",
      image: "/images/gorro.jpg",
      whatsappMessage: "¡Hola! Quiero un Gorro de Cumpleaños personalizado (S/10.00) 🥳"
    },
    
  // --- MODA CANINA (PRÓXIMAMENTE) ---
  /* 
  // Cuando tengas tus productos de moda, borra estos comentarios y edita los datos:
  {
    id: 8,
    name: "Polo 'Manchas Style'",
    price: "S/35.00",
    description: "Polo de algodón 100% con diseño exclusivo de Manchas Cakes, cómodo y fresco.",
    category: "Moda Canina",
    image: "/images/polo-canino.jpg",
    whatsappMessage: "¡Hola! Me interesa el Polo 'Manchas Style' (S/35.00) 👕"
  },
  {
    id: 9,
    name: "Vestido de Fiesta",
    price: "S/55.00",
    description: "Elegante vestido para ocasiones especiales, con detalles de tul y lazo ajustable.",
    category: "Moda Canina",
    image: "/images/vestido.jpg",
    whatsappMessage: "¡Hola! Quisiera información sobre el Vestido de Fiesta (S/55.00) 👗"
  }
  */
];

const FLAVORS = [
  { name: "Hígado", icon: "🥩" },
  { name: "Atún", icon: "🐟" },
  { name: "Pollo", icon: "🍗" },
  { name: "Carne", icon: "🍖" },
  { name: "Plátano", icon: "🍌" },
  { name: "Arándanos", icon: "🫐" },
  { name: "Manzana", icon: "🍎" },
  { name: "Espinaca", icon: "🥬" },
  { name: "Brócoli", icon: "🥦" },
  { name: "Zanahoria", icon: "🥕" },
  { name: "Maní", icon: "🥜" },
  { name: "Miel", icon: "🍯" }
];

// --- 8 & 9. AQUÍ EDITAR OPCIONES Y MENSAJES DEL CHATBOT ---
const CHATBOT_STEPS = {
  start: {
    message: "¡Hola! Soy el asistente de Manchas Cakes 🐶💕 ¿En qué puedo ayudarte hoy?",
    options: [
      { label: "Ver tortas 🎂", nextStep: "tortas" },
      { label: "Ver snacks 🦴", nextStep: "snacks" },
      { label: "Pedido personalizado 🎨", nextStep: "personalizado" },
      { label: "Cotizar cumpleaños 🎈", nextStep: "cumple" },
      { label: "Hablar por WhatsApp 📱", nextStep: "whatsapp" }
    ]
  },
  tortas: {
    message: "¡Excelente elección! Nuestras tortas son 100% naturales. ¿Qué tamaño buscas?",
    options: [
      { label: "Pequeña (1-2 perros)", nextStep: "catalogo_tortas" },
      { label: "Grande (Fiesta)", nextStep: "catalogo_tortas" },
      { label: "Volver al inicio", nextStep: "start" }
    ]
  },
  snacks: {
    message: "Nuestros snacks son horneados y sin conservantes. ¡Ideales para premiarlos!",
    options: [
      { label: "Ver catálogo de snacks", nextStep: "catalogo_snacks" },
      { label: "Volver al inicio", nextStep: "start" }
    ]
  },
  personalizado: {
    message: "¡Qué lindo! Podemos ayudarte con un pedido único para tu mejor amigo.",
    options: [
      { label: "Escribir por WhatsApp ahora", action: "whatsapp", message: "Hola! Quiero un pedido personalizado" },
      { label: "Volver al inicio", nextStep: "start" }
    ]
  },
  cumple: {
    message: "¡Festejemos a lo grande! Para cotizar necesito saber: ¿Para qué fecha es?",
    options: [
      { label: "Escribir fecha por WhatsApp", action: "whatsapp", message: "Hola! Quiero cotizar un cumpleaños para mi mascota" },
      { label: "Volver al inicio", nextStep: "start" }
    ]
  },
  whatsapp: {
    message: "Te conecto directamente con nuestro equipo humano. ¡Te esperamos!",
    options: [
      { label: "Abrir WhatsApp", action: "whatsapp", message: "Hola! Vengo del asistente web y tengo una consulta" },
      { label: "Volver al inicio", nextStep: "start" }
    ]
  },
  catalogo_tortas: {
    message: "Puedes ver todas nuestras tortas en la sección de Catálogo filtrando por 'Tortas'.",
    options: [
      { label: "Ir al Catálogo", action: "scroll", target: "catalogo" },
      { label: "Volver al inicio", nextStep: "start" }
    ]
  },
  catalogo_snacks: {
    message: "Puedes ver todos nuestros snacks en la sección de Catálogo filtrando por 'Snacks'.",
    options: [
      { label: "Ir al Catálogo", action: "scroll", target: "catalogo" },
      { label: "Volver al inicio", nextStep: "start" }
    ]
  }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [chatStep, setChatStep] = useState("start");
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar chat al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };
    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatOpen]);

  const categories = ["Todos", "Packs", "Accesorios", "Moda Canina"];

  const filteredProducts = activeCategory === "Todos" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleChatOption = (option: any) => {
    if (option.action === "whatsapp") {
      window.open(`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(option.message)}`, '_blank');
    } else if (option.action === "scroll") {
      const el = document.getElementById(option.target);
      el?.scrollIntoView({ behavior: 'smooth' });
      setIsChatOpen(false);
    } else if (option.nextStep) {
      setChatStep(option.nextStep);
    }
  };

  return (
    <div className="font-sans selection:bg-primary selection:text-white">
      
      {/* 1) HEADER / MENÚ SUPERIOR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2 md:py-3' : 'bg-transparent py-2 md:py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" className="hover:opacity-80 transition-opacity">
            <Logo />
          </a>

          {/* Menú Desktop */}
            <div className="hidden md:flex items-center gap-8">
            {[
              { name: "Inicio", id: "inicio" },
              { name: "Nosotros", id: "nosotros" },
              { name: "Catálogo", id: "catalogo" },
              { name: "Servicios", id: "servicios" },
              { name: "Testimonios", id: "testimonios" },
              { name: "Galería", id: "galeria" },
              { name: "Contacto", id: "contacto" }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a href={WHATSAPP_BASE_URL} target="_blank" className="btn-primary py-2 px-6 text-sm">
              Pedir Ahora
            </a>
          </div>

          {/* Botón Mobile */}
          <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Menú Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
            >
              {[
                { name: "Inicio", id: "inicio" },
                { name: "Nosotros", id: "nosotros" },
                { name: "Catálogo", id: "catalogo" },
                { name: "Servicios", id: "servicios" },
                { name: "Testimonios", id: "testimonios" },
                { name: "Galería", id: "galeria" },
                { name: "Contacto", id: "contacto" }
              ].map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  className="text-slate-600 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>




 {/* 2) SECCIÓN DE INICIO (HERO) */}
<section
  id="inicio"
  className="relative flex items-center pt-20 md:pt-32 pb-10 md:pb-20 overflow-hidden bg-accent"
>
  <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className="inline-block py-1 px-3 bg-primary/20 text-primary rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
        🐶 Pastelería Canina Artesanal
      </span>

      <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-4 md:mb-6">
        Momentos <span className="text-secondary">Dulces</span> para tu mejor amigo
      </h1>

      <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed">
        En {BRAND_NAME} transformamos el amor por tu peludo en momentos inolvidables.
        Nuestras tortas, hechas con ingredientes 100% naturales y respaldo veterinario,
        son seguras, saludables y deliciosas. Un regalo especial para tu mejor amigo. 🐶💙
        Haz tu pedido y celebra con Manchas Cakes.
      </p>

      <div className="flex flex-wrap gap-3 md:gap-4">
        <a href="#catalogo" className="btn-primary">
          Ver Catálogo <ShoppingBag size={20} />
        </a>

        <a href={WHATSAPP_BASE_URL} target="_blank" rel="noreferrer" className="btn-secondary">
          Pedir por WhatsApp <MessageCircle size={20} />
        </a>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Imagen clickeable */}
      <a
        href="https://www.instagram.com/reel/DWKwrX3jHmt/?igsh=Y2t2Mzc3NmhvdHEz"
        className="relative z-10 block rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/3] group"
      >
        <img
          src="/images/inicio.png"
          alt="Perro feliz - Manchas Cakes"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (!e.currentTarget.src.includes("unsplash")) {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=800";
            }
          }}
        />

        {/* Capa oscura al pasar mouse */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition duration-300"></div>

        {/* Botón / letrero encima */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl text-sm md:text-base">
            Conócenos 💖
          </span>
        </div>
      </a>

      {/* Elementos decorativos */}
      <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg z-20 animate-bounce">
        <Heart className="text-secondary fill-secondary" />
      </div>

      <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg z-20 flex items-center gap-2">
        <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
        <span className="font-bold text-slate-800">4.9/5 Clientes Felices</span>
      </div>
    </motion.div>
  </div>
</section>




      {/* 3) SECCIÓN NOSOTROS */}
      <section id="nosotros" className="bg-white">
        <div className="section-padding grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            {/* PARA CAMBIAR ESTA IMAGEN: 
                1. Sube tu foto a 'public/images/historia.jpg'
                2. O cambia el link de abajo por uno de internet. */}
            <img 
              src="/images/Historia.png" 
              alt="Nuestra Historia - Manchas Cakes" 
              className="rounded-[1.5rem] md:rounded-[2rem] shadow-xl w-full h-auto object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Si la imagen local no existe, usa esta de respaldo
                if (!e.currentTarget.src.includes('unsplash')) {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800";
                }
              }}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-6">Nuestra Historia</h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-slate-600 leading-relaxed">
              <p>
                {BRAND_NAME} comenzó con Manchas, nuestro querido perro, quien sufría de alergias alimentarias. Verlo limitado nos inspiró a crear una alternativa segura, deliciosa y hecha especialmente para él.
              </p>
              <p>
               Hoy, en Manchas Cakes, convertimos ese amor en cada preparación <strong>cuidando cada ingrediente</strong>para ofrecer productos 100% seguros y especiales para tu mascota. 🐶💙
              </p>
            </div>
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-accent rounded-xl md:rounded-2xl border-l-4 border-primary italic text-base md:text-base text-slate-700">
              "Cocinamos con el mismo amor que ellos nos dan cada día."
            </div>
            <div className="mt-6 md:mt-8 flex items-center gap-4 md:gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 md:p-3 rounded-full mb-1 md:mb-2">
                  <Award className="text-primary w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs md:text-xs font-bold text-slate-500 uppercase">Calidad Premium</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-secondary/10 p-2 md:p-3 rounded-full mb-1 md:mb-2">
                  <Heart className="text-secondary w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs md:text-xs font-bold text-slate-500 uppercase">Hecho con Amor</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE SABORES */}
      <section className="bg-white py-2 md:py-16 border-t border-slate-100">
        <div className="section-padding">
          <div className="text-center mb-2 md:mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-slate-900 mb-1 md:mb-4">Sabores Naturales</h2>
            <p className="text-xs md:text-base text-slate-600 max-w-2xl mx-auto italic">
              "Nuestras tortas son peques y bajitas porque no usamos elevadores ni conservantes, con la finalidad de cuidar la salud de tu perrito y gatito."
            </p>
            <div className="mt-2 inline-block py-1 px-3 bg-secondary/10 text-secondary rounded-full font-bold text-[11px] md:text-sm">
              🩺 Supervisado por un Médico Veterinario
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
            {FLAVORS.map((flavor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-accent border border-primary/10 hover:border-primary/30 transition-all"
              >
                <span className="text-3xl md:text-4xl mb-1 md:mb-2">{flavor.icon}</span>
                <span className="font-bold text-sm md:text-slate-700">{flavor.name}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-primary font-bold text-lg md:text-xl">¡Elige 2 sabores para tu Pack!</p>
          </div>
        </div>
      </section>

      {/* 4) SECCIÓN CATÁLOGO */}
      <section id="catalogo" className="bg-slate-50">
        <div className="section-padding">
          <div className="text-center mb-2 md:mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-slate-900 mb-1 md:mb-4">Nuestro Catálogo</h2>
            <p className="text-xs md:text-base text-slate-600 max-w-2xl mx-auto">
              Elige el regalo perfecto para tu peludo. Todos nuestros productos son frescos y hechos a pedido.
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-4 md:mb-12">
            {/* Desktop botones */}
            <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`min-w-[125px] md:min-w-[150px] px-4 py-2 rounded-full text-sm md:text-base font-bold transition-all duration-200 ${activeCategory === cat ? 'bg-primary text-white shadow-xl transform scale-105 border border-primary' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:text-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile select */}
            <div className="block md:hidden">
              <label htmlFor="category-select" className="sr-only">Seleccionar categoría</label>
              <select
                id="category-select"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-secondary focus:ring-2 focus:ring-secondary/30"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grilla de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      {/* AQUÍ CAMBIAR IMÁGENES DEL CATÁLOGO */}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-primary uppercase tracking-widest shadow-sm border border-white/20">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <h3 className="text-2xl font-serif italic text-slate-900 leading-tight group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-secondary font-black text-xl whitespace-nowrap">
                          {product.price}
                        </span>
                      </div>
                      
                      <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="mt-auto space-y-3">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-900 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all group/more"
                        >
                          Ver más
                          <Eye size={18} className="group-hover/more:scale-110 transition-transform" />
                        </button>
                        <a 
                          href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(product.whatsappMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-primary transition-all group/btn"
                        >
                          Pedir por WhatsApp 
                          <MessageCircle size={18} className="group-hover/btn:rotate-12 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="col-span-full py-12 md:py-16 text-center bg-white rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-slate-200"
                >
                  <div className="bg-primary/10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Star className="text-primary w-8 h-8 md:w-10 md:h-10 animate-pulse" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif italic text-slate-900 mb-2">Próximamente...</h3>
                  <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto px-6">
                    Estamos preparando una colección increíble de {activeCategory} para tu mejor amigo. ¡Vuelve pronto!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5) SECCIÓN SERVICIOS */}
      <section id="servicios" className="bg-white">
        <div className="section-padding">
          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Servicios Especiales</h2>
            <p className="text-slate-600">Más que comida, creamos experiencias felices para tu mascota.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            {[
              { title: "Tortas Personalizadas", desc: "Diseños únicos adaptados a la personalidad de tu perro.", icon: <Star className="text-primary" /> },
              { title: "Cumpleaños Caninos", desc: "Organizamos el evento completo con decoración y snacks.", icon: <Star className="text-secondary" /> },
              { title: "Snacks Saludables", desc: "Premios horneados sin conservantes ni colorantes artificiales.", icon: <Star className="text-primary" /> },
              { title: "Packs de Regalo", desc: "La combinación perfecta para sorprender en cualquier ocasión.", icon: <Star className="text-secondary" /> },
              { title: "Asesoría Nutricional", desc: "Te ayudamos a elegir el mejor snack según su dieta.", icon: <Star className="text-primary" /> },
              { title: "Envío a Domicilio", desc: "Llevamos la alegría directamente a tu puerta.", icon: <Star className="text-secondary" /> },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-accent border border-primary/10 hover:border-primary/30 transition-all text-center"
              >
                <div className="bg-white w-16 h-16 rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) SECCIÓN TESTIMONIOS Y VIDEO - REDISEÑO BENTO GRID */}
      <section id="testimonios" className="bg-white relative overflow-hidden py-8 md:py-16">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(0,206,209,0.05)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(255,20,147,0.05)_0%,transparent_50%)]" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -left-24 text-primary/5"
          >
            <PawPrint size={300} />
          </motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -right-32 text-secondary/5"
          >
            <PawPrint size={400} />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6 md:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4"
            >
              <Heart size={14} className="fill-primary" />
              Comunidad Manchas
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Huellas que <span className="text-secondary italic font-serif">enamoran</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Nuestros clientes (y sus humanos) nos cuentan sus experiencias más dulces.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Testimonio Destacado */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-1 bg-primary/5 p-8 rounded-[3rem] border border-primary/10 flex flex-col justify-between relative overflow-hidden group"
            >
              <Quote size={80} className="absolute -top-4 -right-4 text-primary/10 group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-2xl font-serif italic text-slate-800 leading-relaxed mb-8">
                  "La torta de pollo fue un éxito total. Toby no dejó ni las migas y se sintió súper bien después. ¡Recomendado!"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/user1/100/100" alt="Laura & Toby" className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                <div>
                  <span className="font-bold text-slate-900 block">Laura & Toby</span>
                  <span className="text-xs text-primary font-bold uppercase tracking-tighter">Cumpleaños</span>
                </div>
              </div>
            </motion.div>

         {/* Card 2: Video Destacado (Ocupa 2 columnas en desktop) */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  onClick={() => setIsVideoModalOpen(true)}
  className="md:col-span-2 lg:col-span-2 bg-slate-900 rounded-[3rem] overflow-hidden relative group aspect-video md:aspect-auto min-h-[400px] cursor-pointer"
>
  <img 
    src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=1200" 
    alt="Video miniatura" 
    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
    referrerPolicy="no-referrer"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="max-w-md">
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Mira cómo festejamos</h3>
        <p className="text-slate-300 text-sm md:text-base">Un resumen de nuestro último evento de cumpleaños canino.</p>
      </div>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl self-start md:self-auto"
      >
        <PlayCircle size={40} className="text-white ml-1" />
      </motion.div>
    </div>
  </div>
  {/* Floating Stats */}
  <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl hidden md:block">
    <div className="text-center">
      <p className="text-2xl font-black text-white">+500</p>
      <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Amigos Felices</p>
    </div>
  </div>
</motion.div>

            {/* Card 3: Testimonio 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between relative group"
            >
              <div className="absolute top-8 right-8 text-secondary/10 group-hover:rotate-12 transition-transform">
                <PawPrint size={40} />
              </div>
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-xl font-serif italic text-slate-700 leading-relaxed mb-8">
                  "Excelente atención y los snacks dentales son mágicos. ¡Luna los ama y su aliento mejoró muchísimo!"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/user2/100/100" alt="Carlos & Luna" className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                <div>
                  <span className="font-bold text-slate-900 block">Carlos & Luna</span>
                  <span className="text-xs text-secondary font-bold uppercase tracking-tighter">Snacks</span>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Testimonio 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-secondary/5 p-8 rounded-[3rem] border border-secondary/10 flex flex-col justify-between relative group"
            >
              <Quote size={80} className="absolute -top-4 -right-4 text-secondary/10 group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-xl font-serif italic text-slate-700 leading-relaxed mb-8">
                  "Los cupcakes son hermosos y se nota que son naturales. Rocky es muy alérgico y estos le sentaron de maravilla."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/user3/100/100" alt="Marta & Rocky" className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                <div>
                  <span className="font-bold text-slate-900 block">Marta & Rocky</span>
                  <span className="text-xs text-secondary font-bold uppercase tracking-tighter">Cupcakes</span>
                </div>
              </div>
            </motion.div>

            {/* Card 5: CTA o Frase Final */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-primary to-secondary p-8 rounded-[3rem] flex flex-col items-center justify-center text-center text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-4 gap-4 p-4">
                  {[...Array(12)].map((_, i) => <PawPrint key={i} size={24} />)}
                </div>
              </div>
              <Heart size={48} className="fill-white mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold mb-4">¿Quieres ver a tu peludo aquí?</h3>
              <p className="text-white/80 text-sm mb-8">Etiquétanos en Instagram para aparecer en nuestra galería de amigos felices.</p>
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-secondary px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg"
              >
                @manchas_cakes
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6.5) SECCIÓN GALERÍA DE CUMPLEAÑEROS */}
      <section id="galeria" className="bg-slate-50 overflow-hidden">
        <div className="section-padding">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Galería de Cumpleañeros 🐾</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mb-8">
              ¡Mira a nuestros amigos disfrutando de sus momentos más dulces! Cada foto es una historia de felicidad.
            </p>
            <a 
              href={WHATSAPP_BASE_URL} 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all shadow-lg hover:scale-105"
            >
              ¡Envíanos la foto de tu peludo! <Camera size={20} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              "/images/perro1.jpeg",
              "/images/perro3.jpeg",
              "/images/perro4.jpeg",
              "/images/perro5.jpeg",
              "/images/perro16.jpeg",
              "/images/perro7.jpeg",
              "/images/perro8.jpeg",
              "/images/perro9.jpeg",
              "/images/perro10.jpeg",
              "/images/perro11.jpeg",
              "/images/perro12.jpeg",
              "/images/perro20.jpeg",
              "/images/perro21.jpeg",
       
      
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative group overflow-hidden rounded-2xl md:rounded-[2rem] shadow-lg ${idx % 3 === 0 ? 'md:row-span-2' : ''}`}
              >
                <img 
                  src={img} 
                  alt={`Cumpleañero ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
                  <span className="text-white font-bold text-xs md:text-sm">¡Feliz Cumpleaños! 🎂</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) SECCIÓN BENEFICIOS */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <CheckCircle2 className="text-primary" />, title: "100% Natural", desc: "Sin químicos" },
              { icon: <Award className="text-secondary" />, title: "Vet Approved", desc: "Supervisado" },
              { icon: <Heart className="text-primary" />, title: "Hecho a Mano", desc: "Con amor" },
              { icon: <Clock className="text-secondary" />, title: "Siempre Fresco", desc: "Hecho al día" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h4 className="font-bold text-slate-800">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8) SECCIÓN CONTACTO */}
      <section id="contacto" className="bg-accent">
        <div className="section-padding">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid md:grid-cols-2">
            <div className="p-6 md:p-12 bg-primary text-white flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6">¿Hablamos?</h2>
              <p className="mb-8 opacity-90">Estamos listos para hacer feliz a tu mascota. Escríbenos para consultas o pedidos especiales.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl"><Phone size={20} /></div>
                  <div>
                    <p className="text-sm opacity-70 uppercase font-bold">WhatsApp</p>
                    <p className="font-bold">+{WHATSAPP_NUMBER}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl"><MapPin size={20} /></div>
                  <div>
                    <p className="text-sm opacity-70 uppercase font-bold">Ubicación</p>
                    <p className="font-bold">Trujillo, Victor Larco</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl"><Clock size={20} /></div>
                  <div>
                    <p className="text-sm opacity-70 uppercase font-bold">Horario</p>
                    <p className="font-bold">Lun - Dom: 10:30 am- 5:00 pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href={SOCIAL_LINKS.instagram} target="_blank" className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition-colors"><Instagram /></a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition-colors"><Music2 /></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition-colors"><Youtube /></a>
              </div>
            </div>

            <div className="p-6 md:p-12 flex flex-col justify-center items-center text-center">
              <div className="bg-primary/10 p-6 rounded-full mb-6">
                <Dog size={60} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">¡Haz tu pedido hoy!</h3>
              <p className="text-slate-600 mb-8">Haz clic en el botón de abajo y cuéntanos qué producto te gustaría para tu peludo.</p>
              <a href={WHATSAPP_BASE_URL} target="_blank" className="btn-primary w-full py-4 text-xl">
                Escribir por WhatsApp <MessageCircle />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10) FOOTER */}
      <footer className="bg-slate-900 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-10">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-6 text-slate-400 max-w-sm">
              Pastelería canina artesanal con amor y supervisión veterinaria. Creamos momentos inolvidables para los que más te quieren.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-primary">Enlaces</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-primary">Síguenos</h4>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" className="text-slate-400 hover:text-white transition-colors"><Instagram /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" className="text-slate-400 hover:text-white transition-colors"><Music2 /></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" className="text-slate-400 hover:text-white transition-colors"><Youtube /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-10 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. Todos los derechos reservados. Hecho con 🐾</p>
        </div>
      </footer>

      {/* BOTONES FLOTANTES */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4">
        {/* Chatbot Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-secondary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>

        {/* WhatsApp Direct Button */}
        <a 
          href={WHATSAPP_BASE_URL} 
          target="_blank"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          <Phone size={28} />
        </a>
      </div>

      {/* 9) CHATBOT / ASISTENTE INTERACTIVO SIN IA */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop para móviles (cierra al tocar fuera) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[55] md:hidden"
            />
            
            <motion.div 
              ref={chatRef}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[350px] max-h-[calc(100vh-120px)] glass-card rounded-[2rem] overflow-hidden z-[60] flex flex-col shadow-2xl border-2 border-primary/20"
            >
              {/* Header Chatbot */}
              <div className="bg-primary p-5 text-white flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Dog size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold leading-none text-sm">Asistente Manchas</h4>
                    <p className="text-[9px] opacity-80 mt-1 uppercase tracking-widest">En línea ahora</p>
                  </div>
                </div>
                {/* Botón de cerrar chat */}
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cuerpo Chatbot */}
              <div className="p-5 flex-1 overflow-y-auto bg-white/50 scrollbar-thin scrollbar-thumb-primary/20">
                <div className="flex flex-col gap-4">
                  <motion.div 
                    key={chatStep}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-slate-700 text-sm"
                  >
                    {CHATBOT_STEPS[chatStep as keyof typeof CHATBOT_STEPS].message}
                  </motion.div>

                  <div className="flex flex-col gap-2 mt-2">
                    {CHATBOT_STEPS[chatStep as keyof typeof CHATBOT_STEPS].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleChatOption(opt)}
                        className="text-left p-3 rounded-xl bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/20 transition-all text-sm font-medium flex justify-between items-center group"
                      >
                        {opt.label}
                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Chatbot */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center shrink-0">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Respuesta instantánea</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL DE VIDEO */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-[110]"
            >
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <iframe 
                src={TESTIMONIAL_VIDEO_URL}
                title="Testimonial Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10) MODAL DE DETALLES DE PRODUCTO */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full shadow-lg transition-all text-slate-900"
              >
                <X size={24} />
              </button>

              {/* Imagen del Producto */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              {/* Detalles del Producto */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                <div className="mb-8">
                  <h2 className="text-4xl font-serif italic text-slate-900 mb-2 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-3xl font-black text-secondary">
                    {selectedProduct.price}
                  </p>
                </div>

                <div className="space-y-6 mb-10">
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Descripción del Pack</h3>
                    <div className="text-gray-600 leading-5 text-[15px] space-y-1">
                      {selectedProduct.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                        <p key={idx} className={line.includes('Opciones adicionales') ? 'font-bold text-slate-900' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { text: "Ingredientes Naturales", icon: <CheckCircle2 size={16} className="text-primary" /> },
                      { text: "Sin Conservantes", icon: <CheckCircle2 size={16} className="text-primary" /> },
                      { text: "Supervisión Veterinaria", icon: <CheckCircle2 size={16} className="text-primary" /> },
                      { text: "Hecho a Mano", icon: <CheckCircle2 size={16} className="text-primary" /> },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        {item.icon}
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100">
                  <a 
                    href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(selectedProduct.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-slate-200 group"
                  >
                    Pedir por WhatsApp 
                    <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
                  </a>
                  <p className="text-center text-[10px] text-slate-400 mt-4 font-medium">
                    * Todos nuestros productos requieren 48h de anticipación.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
