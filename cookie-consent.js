/* cookie-consent.js */
(function() {
    'use strict';

    // Injecte le fichier CSS dans le <head> pour appliquer les styles
    const injectCSS = () => {
        const currentScript = document.currentScript;
        const scriptPath = currentScript.src;
        const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/')) + '/';
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = basePath + 'cookie-consent.css';
        document.head.appendChild(link);
    };

    // Crée et affiche la fenêtre modale pour le consentement aux cookies
    const createModal = () => {
        // Créer le conteneur de la modale
        const modal = document.createElement('div');
        modal.className = 'cookie-consent-modal';

        // Créer le contenu de la modale
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        // Créer le texte explicatif avec un lien vers la politique de confidentialité
        const p = document.createElement('p');
        p.innerHTML = '🍪 Ce site utilise des cookies pour personnaliser le contenu et analyser le trafic. Pour en savoir plus, consultez notre <a href="politique.html" target="_blank">politique de confidentialité</a>.';

        // Créer le bouton "Accepter"
        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Accepter';

        // Créer le bouton "Refuser"
        const refuseButton = document.createElement('button');
        refuseButton.textContent = 'Refuser';

        // Assembler le contenu : ajouter le texte et les boutons dans la modale
        modalContent.appendChild(p);
        modalContent.appendChild(acceptButton);
        modalContent.appendChild(refuseButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Quand l'utilisateur clique sur "Accepter"
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            loadScripts(); // Charger les scripts autorisés (ex. Google Analytics)
            removeModal(modal);
        });

        // Quand l'utilisateur clique sur "Refuser"
        refuseButton.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'refused');
            removeModal(modal);
        });
    };

    // Supprime la modale du document
    const removeModal = (modal) => {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    };

    // Charge dynamiquement des scripts (exemple avec Google Analytics) si l'utilisateur accepte
    const loadScripts = () => {
        // Exemple : chargement de Google Analytics
        const gaScript = document.createElement('script');
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID'; // Remplace "YOUR_TRACKING_ID" par ton identifiant
        gaScript.async = true;
        document.head.appendChild(gaScript);

        // Initialisation de Google Analytics
        window.dataLayer = window.dataLayer || [];
        const gtag = (...args) => { window.dataLayer.push(args); };
        gtag('js', new Date());
        gtag('config', 'YOUR_TRACKING_ID'); // Remplace "YOUR_TRACKING_ID" par ton identifiant

        // Tu peux ajouter ici d'autres scripts à charger après acceptation.
    };

    // Initialise le module : injecte le CSS, vérifie si l'utilisateur a déjà choisi, et si non affiche la modale.
    const init = () => {
        injectCSS();

        if (!localStorage.getItem('cookieConsent')) {
            // Si le DOM n'est pas encore prêt, on attend
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createModal);
            } else {
                createModal();
            }
        }
    };

    // Exécute l'initialisation tout de suite
    init();

})();
