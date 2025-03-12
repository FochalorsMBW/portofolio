// Translation data for English and Indonesian
const translations = {
    en: {
        // Navbar
        "nav-home": "Home",
        "nav-about": "About",
        "nav-projects": "Projects",
        "nav-skills": "Skills",
        "nav-contact": "Contact",
        
        // Hero section
        "hero-title": "Hello, I'm <span class='highlight'>Luthfi Al Hakim</span>",
        "hero-subtitle": "Full Stack Developer",
        "hero-desc": "Creating modern and responsive web applications",
        "view-work": "View My Work",
        "contact-me": "Contact Me",
        
        // About section
        "about-title": "About Me",
        "about-p1": "Hello! I'm a passionate full-stack developer with expertise in building modern, responsive, and user-friendly web applications. With a strong background in both front-end and back-end technologies, I create seamless digital experiences that meet client needs.",
        "about-p2": "I love solving complex problems and constantly learning new technologies to stay at the forefront of web development. When I'm not coding, you can find me exploring nature, reading tech blogs, or contributing to open-source projects.",
        "download-resume": "Download Resume",
        
        // Projects section
        "projects-title": "My Projects",
        "project1-title": "Coffee Beans E-Marketplace",
        "project1-desc": "Responsive and interactive coffee beans e-marketplace",
        "project2-title": "E-Learning Website",
        "project2-desc": "Web Application for Responsive and Interactive E-Learning",
        "project3-title": "Vegetables E-Marketplace",
        "project3-desc": "A Vegetarian Website that make you feel fresh doing transaction",
        "live-demo": "Live Demo",
        "source-code": "Source Code",
        
        // Skills section
        "skills-title": "Skills & Expertise",
        "frontend": "Frontend",
        "backend": "Backend",
        "tools": "Tools & Others",
        
        // Contact section
        "contact-title": "Get In Touch",
        "email": "Email",
        "location": "Location",
        "phone": "Phone",
        "name": "Name",
        "subject": "Subject",
        "message": "Message",
        "send-message": "Send Message",
        
        // Footer
        "copyright": "© 2025 Dexter A.K.A Luthfi Al Hakim. All Rights Reserved.",
        
        // Form response
        "message-sent": "Message Sent Successfully!",
        "thank-you": "Thank you for contacting me, {name}. I'll get back to you soon.",
        
        // Language selector
        "language": "EN",
    },
    id: {
        // Navbar
        "nav-home": "Beranda",
        "nav-about": "Tentang",
        "nav-projects": "Proyek",
        "nav-skills": "Keahlian",
        "nav-contact": "Kontak",
        
        // Hero section
        "hero-title": "Halo, Saya <span class='highlight'>Luthfi Al Hakim</span>",
        "hero-subtitle": "Developer Full Stack",
        "hero-desc": "Membuat aplikasi web modern dan responsif",
        "view-work": "Lihat Karya Saya",
        "contact-me": "Hubungi Saya",
        
        // About section
        "about-title": "Tentang Saya",
        "about-p1": "Halo! Saya adalah developer full-stack yang baru belajar dengan keahlian yang cukup bisa diandalkan dalam membangun aplikasi web modern, responsif, dan ramah pengguna. Dengan latar belakang yang kuat dalam teknologi front-end dan back-end, saya menciptakan pengalaman digital yang memenuhi kebutuhan klien.",
        "about-p2": "Saya suka memecahkan masalah kompleks dan terus mempelajari teknologi baru untuk tetap berada di garis depan pengembangan web. Ketika saya tidak sedang mengkode, Anda dapat menemukan saya menjelajahi alam, membaca blog teknologi, atau berkontribusi pada proyek open-source.",
        "download-resume": "Unduh Resume",
        
        // Projects section
        "projects-title": "Proyek Saya",
        "project1-title": "Toko Bijih Kopi",
        "project1-desc": "Platform jual bijih kopi yang responsif dan interaktif",
        "project2-title": "Webstie E-Learning",
        "project2-desc": "Aplikasi web yang responsif serta interaktif dan unik",
        "project3-title": "Toko Sayuran",
        "project3-desc": "Website toko sayuran yang dapat menyegarkan",
        "live-demo": "Demo Langsung",
        "source-code": "Kode Sumber",
        
        // Skills section
        "skills-title": "Keahlian & Spesialisasi",
        "frontend": "Frontend",
        "backend": "Backend",
        "tools": "Alat & Lainnya",
        
        // Contact section
        "contact-title": "Hubungi Saya",
        "email": "Email",
        "location": "Lokasi",
        "phone": "Telepon",
        "name": "Nama",
        "subject": "Subjek",
        "message": "Pesan",
        "send-message": "Kirim Pesan",
        
        // Footer
        "copyright": "© 2025 Dexter A.K.A Luthfi Al Hakim. Hak Cipta Dilindungi.",
        
        // Form response
        "message-sent": "Pesan Berhasil Dikirim!",
        "thank-you": "Terima kasih telah menghubungi saya, {name}. Saya akan segera me-reply Anda.",
        
        // Language selector
        "language": "ID",
    }
};

// Current language (default: English)
let currentLang = 'en';

// Fungsi untuk update bahasa
function updateLanguage(lang) {
    currentLang = lang;
    
    // Simpan bahasa pada penyimpanan lokal
    localStorage.setItem('preferredLanguage', lang);
    
    // Update semua element dengan atribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.value = translations[lang][key];
                }
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = translations[lang]['language'];
    }
}

function initializeTranslation() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
        currentLang = savedLang;
    }
    
    updateLanguage(currentLang);
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'id' : 'en';
            updateLanguage(newLang);
        });
    }
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    const allTextElements = document.querySelectorAll('body *'); // Pilih semua elemen teks
    
    allTextElements.forEach(el => {
        el.classList.add('glitch'); // Tambahkan efek glitch
    });

    // Hapus efek setelah animasi selesai agar bisa digunakan lagi
    setTimeout(() => {
        allTextElements.forEach(el => {
            el.classList.remove('glitch');
        });
    }, 600); // 0.2s * 3 (sesuai jumlah loop di CSS)
});


document.addEventListener('DOMContentLoaded', initializeTranslation);