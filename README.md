# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Configuration du formulaire de contact

Pour activer l'envoi réel du formulaire de contact (Formspree, Web3Forms, EmailJS, webhook ou API backend), définissez l'URL d'ingestion dans votre fichier `.env` via la variable :
`VITE_CONTACT_ENDPOINT=https://votre-service.com/api/contact`

Si cette variable est absente, le formulaire affiche un message sobre invitant l'utilisateur à contacter directement Luciole Energy par téléphone (+225 07 07 23 73 53) ou par e-mail (info@luciole-energy.com), en conservant les données saisies sans fausse confirmation de succès.
