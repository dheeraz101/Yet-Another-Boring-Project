/* app.js */
/* YABP Showcase Logic: Fetching, rendering, filtering, sorting, custom dropdown, and 2-way verification */

(function() {
    // DOM Elements
    const themeToggleBtn = document.getElementById('themeToggle');
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClear');
    const searchWrapper = searchInput.parentElement;
    
    const sortTrigger = document.getElementById('sortTrigger');
    const sortOptions = document.getElementById('sortOptions');
    const sortLabel = sortTrigger.querySelector('span');
    const optionItems = sortOptions.querySelectorAll('.custom-select-option');

    const projectGrid = document.getElementById('projectGrid');
    const projectCount = document.getElementById('projectCount');
    const verifyModal = document.getElementById('verifyModal');
    const htmlElement = document.documentElement;

    // Determine local or production URL (smart fetching fallback)
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.protocol === 'file:';
    
    const JSON_URL = isLocal 
        ? './projects.json' 
        : 'https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/refs/heads/main/projects.json';

    // State
    let projects = [];
    let filteredProjects = [];
    let activeSortValue = 'recent';

    // Theme Handlers
    const savedTheme = localStorage.getItem('yabp-theme') || 'light';
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-mode');
        const currentTheme = htmlElement.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('yabp-theme', currentTheme);
    });

    // Custom Dropdown Trigger Handlers
    function toggleDropdown() {
        const isOpen = sortTrigger.parentElement.classList.contains('open');
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    function openDropdown() {
        sortTrigger.parentElement.classList.add('open');
        sortTrigger.setAttribute('aria-expanded', 'true');
        document.addEventListener('click', closeDropdownOutside);
    }

    function closeDropdown() {
        sortTrigger.parentElement.classList.remove('open');
        sortTrigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeDropdownOutside);
    }

    function closeDropdownOutside(e) {
        if (!sortTrigger.parentElement.contains(e.target)) {
            closeDropdown();
        }
    }

    sortTrigger.addEventListener('click', toggleDropdown);

    optionItems.forEach(item => {
        const selectOption = () => {
            const value = item.getAttribute('data-value');
            activeSortValue = value;

            // Update UI states
            optionItems.forEach(opt => {
                opt.classList.remove('active');
                opt.setAttribute('aria-selected', 'false');
            });
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');
            sortLabel.textContent = item.textContent;

            closeDropdown();
            filterAndSort(); // Trigger sorting
        };

        // Click select
        item.addEventListener('click', selectOption);

        // Keyboard select (Accessibility)
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectOption();
                sortTrigger.focus();
            }
        });
    });

    // Keyboard navigation for dropdown accessibility
    sortTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDropdown();
            optionItems[0].focus();
        }
    });

    sortOptions.addEventListener('keydown', (e) => {
        const focusedElement = document.activeElement;
        const itemsArray = Array.from(optionItems);
        const currentIndex = itemsArray.indexOf(focusedElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % itemsArray.length;
            itemsArray[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
            itemsArray[prevIndex].focus();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown();
            sortTrigger.focus();
        }
    });

    // Loading state UI helper
    function showLoading() {
        projectGrid.innerHTML = `
            <div class="state-container">
                <div class="spinner"></div>
                <p>Loading curated showcase...</p>
            </div>`;
    }

    // Error state UI helper
    function showError(errMessage) {
        projectGrid.innerHTML = `
            <div class="state-container">
                <i class="ri-error-warning-line" style="color: #e74c3c;" aria-hidden="true"></i>
                <p>Failed to load directory details: ${errMessage}</p>
            </div>`;
    }

    // Empty state UI helper
    function showEmpty() {
        projectGrid.innerHTML = `
            <div class="state-container">
                <i class="ri-compass-3-line" aria-hidden="true"></i>
                <p>No matching projects found. Check spelling or try a different filter.</p>
            </div>`;
    }

    // Format date helper (e.g. "2026-05-23" -> "May 23, 2026")
    function formatDate(dateStr) {
        if (!dateStr) return '—';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return dateStr;
        }
    }

    // Escaping helper
    function escapeHTML(str) {
        if (!str) return '';
        const tempDiv = document.createElement('div');
        tempDiv.textContent = str;
        return tempDiv.innerHTML;
    }

    // Render project cards
    function renderProjects() {
        if (filteredProjects.length === 0) {
            showEmpty();
            projectCount.textContent = '0';
            return;
        }

        projectCount.textContent = filteredProjects.length;

        projectGrid.innerHTML = filteredProjects.map(proj => {
            const name = escapeHTML(proj.name || 'Untitled');
            const desc = escapeHTML(proj.description || 'Minimalist project showcase item.');
            const date = escapeHTML(formatDate(proj.date));
            const link = escapeHTML(proj.link || '');
            const github = escapeHTML(proj.github || '');

            const hasLink = link !== '';
            const hasGithub = github !== '';

            return `
                <article class="project-card">
                    <div class="project-meta">
                        <div class="project-card-header">
                            <h3 class="project-name" title="${name}">${name}</h3>
                        </div>
                        <span class="project-date">${date}</span>
                        <p class="project-description">${desc}</p>
                    </div>
                    <div class="project-actions">
                        <span class="project-badge-tag">
                            <i class="ri-verified-badge-line" style="color: var(--accent);" aria-hidden="true"></i>
                            YABP Umbrella
                        </span>
                        <div class="project-links">
                            ${hasGithub ? `
                                <a href="${github}" target="_blank" rel="noopener" class="card-icon-link github" title="GitHub Repository" aria-label="GitHub repository for ${name}">
                                    <i class="ri-github-fill"></i>
                                </a>` : ''}
                            ${hasLink ? `
                                <a href="${link}" target="_blank" rel="noopener" class="card-icon-link" title="Visit Live App" aria-label="Live link for ${name}">
                                    <i class="ri-external-link-line"></i>
                                </a>` : ''}
                        </div>
                    </div>
                </article>`;
        }).join('');
    }

    // Filter & Sort Projects
    function filterAndSort() {
        const searchVal = searchInput.value.toLowerCase().trim();
        const sortBy = activeSortValue;

        // 1. Filter
        filteredProjects = projects.filter(proj => {
            const name = (proj.name || '').toLowerCase();
            const desc = (proj.description || '').toLowerCase();
            return name.includes(searchVal) || desc.includes(searchVal);
        });

        // 2. Sort
        filteredProjects.sort((a, b) => {
            if (sortBy === 'recent') {
                return new Date(b.date || 0) - new Date(a.date || 0);
            } else if (sortBy === 'oldest') {
                return new Date(a.date || 0) - new Date(b.date || 0);
            } else if (sortBy === 'alpha') {
                return (a.name || '').localeCompare(b.name || '');
            }
            return 0;
        });

        renderProjects();
    }

    // 2-Way Trust Verification URL Parameter Lookup
    function handleVerification() {
        const urlParams = new URLSearchParams(window.location.search);
        const verifyUrl = urlParams.get('verify');
        if (!verifyUrl) return;

        const cleanVerifyUrl = verifyUrl.trim().toLowerCase().replace(/\/$/, ""); // strip trailing slashes

        const match = projects.find(p => {
            const link = (p.link || '').trim().toLowerCase().replace(/\/$/, "");
            const github = (p.github || '').trim().toLowerCase().replace(/\/$/, "");
            return link === cleanVerifyUrl || github === cleanVerifyUrl;
        });

        const badgeEl = document.getElementById('verifyStatusBadge');
        const badgeIcon = badgeEl.querySelector('i');
        const badgeText = badgeEl.querySelector('span');
        const titleEl = verifyModal.querySelector('.verify-title');
        const messageEl = verifyModal.querySelector('.verify-message');
        const closeBtn = document.getElementById('closeVerifyBtn');

        if (match) {
            // Verification Success State
            badgeEl.className = 'verify-status-badge success';
            badgeIcon.className = 'ri-checkbox-circle-fill';
            badgeText.textContent = 'Verified YABP Project';
            titleEl.textContent = 'Verification Successful';
            messageEl.innerHTML = `
                <strong>${escapeHTML(match.name)}</strong> is officially verified as part of the YABP Initiative. It conforms to our minimalist aesthetics, high utility, and privacy standards.
                <span class="verify-url-text">${escapeHTML(verifyUrl)}</span>
            `;
            
            // Search filter the matches to highlight the verified card
            searchInput.value = match.name;
            searchWrapper.classList.add('has-text');
            filterAndSort();

            // Smooth scroll to the showcase grid
            setTimeout(() => {
                const gallerySection = document.getElementById('gallery');
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }, 600);
        } else {
            // Verification Failed State
            badgeEl.className = 'verify-status-badge error';
            badgeIcon.className = 'ri-close-circle-fill';
            badgeText.textContent = 'Verification Failed';
            titleEl.textContent = 'Unregistered Project';
            messageEl.innerHTML = `
                The project at the URL below is not listed in the official YABP directory.
                <span class="verify-url-text">${escapeHTML(verifyUrl)}</span>
                <br>
                If this is your project, please read the contribution guidelines below to submit a listing.
            `;
        }

        // Show Modal Dialog
        verifyModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        closeBtn.addEventListener('click', () => {
            verifyModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Strip the verify parameter from the URL bar without forcing reload
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
        });
    }

    // Load projects from database
    async function loadProjects() {
        showLoading();
        try {
            const response = await fetch(JSON_URL, {
                cache: 'no-cache'
            });
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }
            const data = await response.json();
            if (!data.projects || !Array.isArray(data.projects)) {
                throw new Error('Invalid JSON format');
            }
            projects = data.projects;
            filterAndSort();
            handleVerification(); // Trigger 2-way verification check once data is ready
        } catch (err) {
            console.error('Failed to load projects:', err);
            showError(err.message || 'Unknown network error');
        }
    }

    // Robust copy helper with insecure context fallback (for HTTP/iframe previews)
    function copyText(elementId, btnElement) {
        const codeNode = document.getElementById(elementId);
        const textToCopy = codeNode.textContent;
        
        function updateButtonSuccess() {
            const originalHTML = btnElement.innerHTML;
            btnElement.innerHTML = `<i class="ri-check-line" style="color: #34c759;"></i> Copied!`;
            setTimeout(() => {
                btnElement.innerHTML = originalHTML;
            }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(updateButtonSuccess).catch(err => {
                console.warn('Modern copy failed, trying fallback: ', err);
                fallbackCopy(textToCopy);
            });
        } else {
            fallbackCopy(textToCopy);
        }

        function fallbackCopy(text) {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                if (successful) {
                    updateButtonSuccess();
                } else {
                    console.error('Fallback copy command failed.');
                }
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
        }
    }

    // Dynamic Copy Button binding (prevents inline onclick execution CSP block)
    const copyButtons = document.querySelectorAll('.code-btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-copy-target');
            if (targetId) {
                copyText(targetId, btn);
            }
        });
    });

    // Search Clear Button Trigger
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            searchWrapper.classList.add('has-text');
        } else {
            searchWrapper.classList.remove('has-text');
        }
        filterAndSort();
    });

    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchWrapper.classList.remove('has-text');
        filterAndSort();
        searchInput.focus();
    });

    // Custom Badge & Link Generator
    const badgeUrlInput = document.getElementById('badgeUrlInput');
    const codeHtmlNode = document.getElementById('code-html').querySelector('code');
    const codeMdNode = document.getElementById('code-md').querySelector('code');
    const codeDirectNode = document.getElementById('code-direct').querySelector('code');

    function updateGeneratorSnippets() {
        let inputVal = badgeUrlInput.value.trim();
        const placeholder = 'YOUR_PROJECT_URL';
        
        if (!inputVal) {
            inputVal = placeholder;
        }

        const escUrl = escapeHTML(inputVal);

        codeHtmlNode.innerHTML = `&lt;a href="https://yabp.netlify.app/?verify=${escUrl}"&gt;
  &lt;img src="https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png" width="48" height="48" alt="YABP Initiative Logo" style="display: inline-block; vertical-align: middle;" /&gt;
&lt;/a&gt;`;

        codeMdNode.textContent = `[![YABP Initiative Logo](https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png)](https://yabp.netlify.app/?verify=${inputVal})`;
        
        codeDirectNode.textContent = `https://yabp.netlify.app/?verify=${inputVal}`;
    }

    badgeUrlInput.addEventListener('input', updateGeneratorSnippets);

    // Init
    loadProjects();
})();
