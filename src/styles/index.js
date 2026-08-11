import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

/* ======================
   RESET
====================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

/* ======================
   ROOT VARIABLES
====================== */
:root {

  --primary: #4f46e5;
  --primary-dark: #3730a3;

  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;

  --bg: #0f172a;
  --card: #111827;
  --text: #e5e7eb;
  --muted: #94a3b8;

  --border: #1f2937;

}

/* ======================
   BODY
====================== */
body {
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
}

/* ======================
   LINKS
====================== */
a {
  color: inherit;
  text-decoration: none;
}

/* ======================
   SCROLLBAR
====================== */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 10px;
}

/* ======================
   UTILITIES
====================== */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}

.button-primary {
  background: var(--primary);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.button-primary:hover {
  background: var(--primary-dark);
}

`;

export default GlobalStyles;