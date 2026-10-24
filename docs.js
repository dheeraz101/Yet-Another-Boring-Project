/* docs.js */
/* Shared script for YABP documentation & policy pages */
/* Handles theme persistence, code snippet copying, badge generator, and mobile navigation */

(function() {
    'use strict';

    // 1. Theme Management (Sync with index.html localStorage & OS preference)
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('yabp-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark-mode');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark-mode');
            const currentTheme = htmlElement.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('yabp-theme', currentTheme);
        });
    }

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('yabp-theme')) {
                if (e.matches) {
                    htmlElement.classList.add('dark-mode');
                } else {
                    htmlElement.classList.remove('dark-mode');
                }
            }
        });
    }

    // 2. Mobile Drawer Navigation (Apple HIG)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileMenuBtn && mobileDrawer) {
        function toggleMobileDrawer() {
            const isOpen = mobileDrawer.classList.contains('active');
            if (isOpen) {
                closeMobileDrawer();
            } else {
                openMobileDrawer();
            }
        }

        function openMobileDrawer() {
            mobileDrawer.classList.add('active');
            mobileMenuBtn.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileDrawer.setAttribute('aria-hidden', 'false');
            document.addEventListener('click', closeMobileDrawerOutside);
            document.addEventListener('keydown', handleMobileDrawerEsc);
        }

        function closeMobileDrawer() {
            mobileDrawer.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileDrawer.setAttribute('aria-hidden', 'true');
            document.removeEventListener('click', closeMobileDrawerOutside);
            document.removeEventListener('keydown', handleMobileDrawerEsc);
        }

        function closeMobileDrawerOutside(e) {
            if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileDrawer();
            }
        }

        function handleMobileDrawerEsc(e) {
            if (e.key === 'Escape') {
                closeMobileDrawer();
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMobileDrawer);

        const drawerLinks = mobileDrawer.querySelectorAll('.mobile-drawer-link');
        drawerLinks.forEach(link => {
            link.addEventListener('click', closeMobileDrawer);
        });
    }

    // 3. Robust Copy to Clipboard with Feedback & Insecure Context Fallback
    function copyText(elementId, btnElement) {
        const codeNode = document.getElementById(elementId);
        if (!codeNode) return;
        const textToCopy = codeNode.textContent;

        function updateButtonSuccess() {
            const originalHTML = btnElement.innerHTML;
            btnElement.innerHTML = `<i class="ri-check-line" style="color: #34c759;"></i> Copied!`;
            setTimeout(() => {
                btnElement.innerHTML = originalHTML;
            }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy)
                .then(updateButtonSuccess)
                .catch(() => fallbackCopy(textToCopy, updateButtonSuccess));
        } else {
            fallbackCopy(textToCopy, updateButtonSuccess);
        }
    }

    function fallbackCopy(text, onSuccess) {
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
            if (successful && onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('Fallback copy command failed: ', err);
        }
    }

    const copyButtons = document.querySelectorAll('.code-btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-copy-target');
            if (targetId) {
                copyText(targetId, btn);
            }
        });
    });

    // 4. Interactive Badge & Link Generator (for contributing.html)
    const badgeUrlInput = document.getElementById('badgeUrlInput');
    if (badgeUrlInput) {
        const codeHtmlNode = document.getElementById('code-html')?.querySelector('code');
        const codeMdNode = document.getElementById('code-md')?.querySelector('code');
        const codeDirectNode = document.getElementById('code-direct')?.querySelector('code');

        function updateGeneratorSnippets() {
            let inputVal = badgeUrlInput.value.trim();
            const placeholder = 'YOUR_PROJECT_URL';
            if (!inputVal) {
                inputVal = placeholder;
            }

            const escUrl = inputVal
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

            if (codeHtmlNode) {
                codeHtmlNode.innerHTML = `&lt;a href="https://yabp.netlify.app/?verify=${escUrl}"&gt;
  &lt;img src="https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png" width="48" height="48" alt="YABP Initiative Logo" style="display: inline-block; vertical-align: middle;" /&gt;
&lt;/a&gt;`;
            }

            if (codeMdNode) {
                codeMdNode.textContent = `[![YABP Initiative Logo](https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png)](https://yabp.netlify.app/?verify=${inputVal})`;
            }

            if (codeDirectNode) {
                codeDirectNode.textContent = `https://yabp.netlify.app/?verify=${inputVal}`;
            }
        }

        badgeUrlInput.addEventListener('input', updateGeneratorSnippets);
    }

    // 5. Pre-Flight Checklist & Developer Agreement Modal (for contributing.html)
    const checklistItems = document.querySelectorAll('.checklist-card input[type="checkbox"]');
    const checklistFill = document.getElementById('checklistFill');
    const checklistCount = document.getElementById('checklistCount');
    const agreementModal = document.getElementById('developerAgreementModal');
    const openAgreementModalBtn = document.getElementById('openAgreementModalBtn');
    const viewAgreementBtnTop = document.getElementById('viewAgreementBtnTop');
    const triggerTermsModal = document.getElementById('triggerTermsModal');
    const closeAgreementModalBtn = document.getElementById('closeAgreementModalBtn');
    const declineAgreementBtn = document.getElementById('declineAgreementBtn');
    const acceptAgreementBtn = document.getElementById('acceptAgreementBtn');
    const agreementCallout = document.getElementById('agreementCallout');
    const openPrBtn = document.getElementById('openPrBtn');

    function updateChecklistProgress() {
        if (!checklistItems || checklistItems.length === 0 || !checklistFill || !checklistCount) return;
        let checked = 0;
        checklistItems.forEach(item => {
            if (item.checked) checked++;
        });
        const percent = Math.round((checked / checklistItems.length) * 100);
        checklistFill.style.width = percent + '%';
        checklistCount.textContent = `${checked} of ${checklistItems.length} verified (${percent}%)`;
        if (percent === 100) {
            checklistCount.innerHTML = `<span style="color: #34c759; font-weight: 600;"><i class="ri-checkbox-circle-fill"></i> All criteria agreed: Ready for PR!</span>`;
        }
    }

    if (checklistItems.length > 0 && checklistFill && checklistCount) {
        checklistItems.forEach(item => {
            item.addEventListener('change', updateChecklistProgress);
        });
        updateChecklistProgress();

        // Prevent links inside checklist labels from inadvertently toggling the checkbox
        const checklistLinks = document.querySelectorAll('.checklist-item a');
        checklistLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    // Modal Control Functions
    if (agreementModal) {
        function openAgreement() {
            agreementModal.classList.add('active');
            agreementModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeAgreement() {
            agreementModal.classList.remove('active');
            agreementModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (openAgreementModalBtn) {
            openAgreementModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openAgreement();
            });
        }

        if (viewAgreementBtnTop) {
            viewAgreementBtnTop.addEventListener('click', (e) => {
                e.preventDefault();
                openAgreement();
            });
        }

        if (triggerTermsModal) {
            triggerTermsModal.addEventListener('click', (e) => {
                e.preventDefault();
                openAgreement();
            });
        }

        if (agreementCallout) {
            agreementCallout.addEventListener('click', (e) => {
                // If user didn't click an existing link inside
                if (!e.target.closest('a') && !e.target.closest('button')) {
                    openAgreement();
                }
            });
        }

        if (closeAgreementModalBtn) {
            closeAgreementModalBtn.addEventListener('click', closeAgreement);
        }

        if (declineAgreementBtn) {
            declineAgreementBtn.addEventListener('click', closeAgreement);
        }

        agreementModal.addEventListener('click', (e) => {
            if (e.target === agreementModal) {
                closeAgreement();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && agreementModal.classList.contains('active')) {
                closeAgreement();
            }
        });

        if (acceptAgreementBtn) {
            acceptAgreementBtn.addEventListener('click', () => {
                // Auto-check agreement criteria on checklist
                const termsCheck = document.getElementById('check-terms');
                const propagationCheck = document.getElementById('check-propagation');
                if (termsCheck) termsCheck.checked = true;
                if (propagationCheck) propagationCheck.checked = true;
                updateChecklistProgress();
                closeAgreement();
            });
        }

        if (openPrBtn) {
            openPrBtn.addEventListener('click', (e) => {
                let checkedCount = 0;
                checklistItems.forEach(item => {
                    if (item.checked) checkedCount++;
                });
                if (checkedCount < checklistItems.length) {
                    // Open agreement modal if pre-flight checklist is incomplete
                    e.preventDefault();
                    openAgreement();
                }
            });
        }
    }
})();

