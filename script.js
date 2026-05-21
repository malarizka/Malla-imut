(function () {
    const fotoList = [
        { url: "https://i.ibb.co/T38fXvf/1.jpg", judul: "Kenangan 1" },
        { url: "https://i.ibb.co/5WFbJgRx/2.jpg", judul: "Kenangan 2" },
        { url: "https://i.ibb.co/Wp7sVcNQ/3.jpg", judul: "Kenangan 3" },
        { url: "https://i.ibb.co/8Hzp8WN/4.jpg", judul: "Kenangan 4" },
        { url: "https://i.ibb.co/qYWqLV1M/5.jpg", judul: "Kenangan 5" },
        { url: "https://i.ibb.co/jvjmqs4J/6.jpg", judul: "Kenangan 6" },
        { url: "https://i.ibb.co/TxPSPLCw/7.jpg", judul: "Kenangan 7" },
        { url: "https://i.ibb.co/m5KCvVRQ/8.jpg", judul: "Kenangan 8" },
        { url: "https://i.ibb.co/MDzk5y7F/9.jpg", judul: "Kenangan 9" },
        { url: "https://i.ibb.co/209c2dL2/10.jpg", judul: "Kenangan 10" },
        { url: "https://i.ibb.co/Ngdj501n/11.jpg", judul: "Kenangan 11" },
        { url: "https://i.ibb.co/0VX4d0Q2/12.jpg", judul: "Kenangan 12" },
        { url: "https://i.ibb.co/3y693zh2/13.jpg", judul: "Kenangan 13" },
        { url: "https://i.ibb.co/5WqN9YhT/14.jpg", judul: "Kenangan 14" },
        { url: "https://i.ibb.co/fWX738X/15.jpg", judul: "Kenangan 15" },
        { url: "https://i.ibb.co/Y7N41Rm7/16.jpg", judul: "Kenangan 16" },
        { url: "https://i.ibb.co/ZpdrpSBy/17.jpg", judul: "Kenangan 17" },
        { url: "https://i.ibb.co/dsD421Lk/18.jpg", judul: "Kenangan 18" },
        { url: "https://i.ibb.co/TzVWnMG/19.jpg", judul: "Kenangan 19" },
        { url: "https://i.ibb.co/3mxNbvXn/20.jpg", judul: "Kenangan 20" }
    ];

    const imageTitles = [
        "Momen 1", "Momen 2", "Momen 3", "Momen 4",
        "Momen 5", "Momen 6", "Momen 7", "Momen 8",
        "Momen 9", "Momen 10", "Momen 11", "Momen 12",
        "Momen 13", "Momen 14", "Momen 15", "Momen 16",
        "Momen 17", "Momen 18", "Momen 19", "Momen 20"
    ];

    function generateGallery() {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;

        let html = '';

        for (let i = 0; i < fotoList.length; i++) {
            let imageUrl = fotoList[i].url;
            let title = imageTitles[i];

            html += `
                <div class="gallery-item" data-index="${i + 1}">
                    <img src="${imageUrl}" alt="${title}" loading="lazy" onerror="this.src='https://picsum.photos/id/${(i + 1) * 37 % 200 + 100}/500/500'">
                    <div class="gallery-overlay">
                        <i class="fas fa-expand"></i> ${title}
                    </div>
                </div>
            `;
        }

        grid.innerHTML = html;

        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const overlay = item.querySelector('.gallery-overlay');
                const title = overlay.innerText.replace(/[🔍]/g, '').trim();
                openModal(img.src, title);
            });
        });
    }

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.modal-close');

    function openModal(src, title) {
        if (!modal) return;
        modal.style.display = "flex";
        modalImg.src = src;
        modalCaption.innerHTML = `<i class="fas fa-camera"></i> ${title}`;
        document.body.style.overflow = "hidden";
    }

    function closeModalFunc() {
        if (!modal) return;
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    if (closeModal) closeModal.onclick = closeModalFunc;
    if (modal) modal.onclick = (e) => {
        if (e.target === modal) closeModalFunc();
    };

    const audio = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const musicStatus = document.getElementById('musicStatus');
    const musicHeroBtn = document.getElementById('musicHeroBtn');

    let autoPlayDone = false;

    function startMusic() {
        if (autoPlayDone || !audio) return;
        autoPlayDone = true;

        audio.play().then(() => {
            if (musicIcon) musicIcon.className = "fas fa-pause";
            if (musicStatus) musicStatus.innerText = "Playing";
        }).catch(() => {
            if (musicIcon) musicIcon.className = "fas fa-play";
            if (musicStatus) musicStatus.innerText = "Play";
        });
    }

    window.addEventListener('load', () => {
        startMusic();
        setTimeout(() => {
            if (audio && audio.paused && !autoPlayDone) {
                autoPlayDone = true;
                startMusic();
            }
        }, 500);
    });

    document.body.addEventListener('click', function once() {
        if (audio && audio.paused) {
            startMusic();
        }
    }, { once: true });

    function toggleMusic() {
        if (!audio) return;
        if (audio.paused) {
            audio.play().then(() => {
                if (musicIcon) musicIcon.className = "fas fa-pause";
                if (musicStatus) musicStatus.innerText = "Playing";
            }).catch(e => console.log(e));
        } else {
            audio.pause();
            if (musicIcon) musicIcon.className = "fas fa-play";
            if (musicStatus) musicStatus.innerText = "Play";
        }
    }

    if (musicToggle) musicToggle.addEventListener('click', toggleMusic);
    if (musicHeroBtn) musicHeroBtn.addEventListener('click', toggleMusic);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    function addDarkModeToggle() {
        const btn = document.createElement('button');
        btn.className = 'darkmode-btn';
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(btn);

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
            btn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            if (document.body.classList.contains('dark')) {
                btn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                btn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    generateGallery();
    addDarkModeToggle();

    const footerYear = document.querySelector('footer .footer-content p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', new Date().getFullYear());
    }
})();
