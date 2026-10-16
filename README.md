# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

A clean structure would be:

src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   └── Spinner.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Footer.jsx
│   │
│   └── ui/
│       ├── Card.jsx
│       ├── Input.jsx
│       └── Badge.jsx
│
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── components/
│   │       ├── Hero.jsx
│   │       ├── Features.jsx
│   │       └── Testimonials.jsx
│   │
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.css
│   │
│   └── Contact/
│       ├── Contact.jsx
│       └── Contact.css
│
├── hooks/
│   ├── useTheme.js
│   ├── useDebounce.js
│   └── useLocalStorage.js
│
├── utils/
│   ├── cn.js
│   ├── formatDate.js
│   ├── formatCurrency.js
│   └── validators.js
│
├── services/
│   ├── api.js
│   └── auth.js
│
├── constants/
│   ├── routes.js
│   └── config.js
│
├── context/
│   └── ThemeContext.jsx
│
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── components.css
│
├── App.jsx
└── main.jsx

Simple Rule:

utils/       → generic helpers
hooks/       → reusable React hooks
components/  → reusable UI
pages/       → route-level pages
features/    → feature-specific logic/UI
services/    → API/external communication
constants/   → shared constants
styles/      → global styles/theme
assets/      → images/fonts/icons


For Larger application

src/
├── app/
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   │
│   └── profile/
│       ├── components/
│       └── services/
│
├── components/
│   ├── ui/
│   └── layout/
│
├── hooks/
├── utils/
├── services/
├── constants/
├── assets/
└── styles/


I'd put the page-specific CSS next to the page:

pages/
└── Home/
    ├── Home.jsx
    ├── Home.css
    └── components/
        ├── Hero.jsx
        ├── Hero.css
        ├── Features.jsx
        └── Features.css



<!-- Chagpt response -->



        Yes. The effect you’re referring to is a **sliding pill/thumb**: the active background doesn't disappear and reappear on each button; one pill smoothly moves to the newly selected tab. uiCookies describes that pattern as a segmented control with a sliding thumb. ([uiCookies][1])

For your **All / Movies / Series** tabs, I’d implement it this way rather than animating each button's background.

### 1. Put one sliding indicator behind the buttons

```jsx
<div className="relative flex w-fit flex-wrap gap-1 rounded-full bg-black/[0.03] p-1 dark:bg-white/[0.04]">
  {/* Sliding pill */}
  <div
    className={`
      absolute inset-y-1
      rounded-full
      bg-[linear-gradient(135deg,var(--red),var(--red-dark))]
      shadow-[0_2px_12px_var(--red-glow)]
      transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
      ${activeFilter === "all" ? "left-1 w-[58px]" : ""}
      ${activeFilter === "movie" ? "left-[62px] w-[95px]" : ""}
      ${activeFilter === "series" ? "left-[161px] w-[91px]" : ""}
    `}
  />

  <button
    onClick={fetchAllData}
    className="relative z-10 rounded-full px-4 py-[5px] text-[0.82rem] font-medium text-[#6b7a8d] transition-colors duration-300 data-[active=true]:text-white"
    data-active={activeFilter === "all"}
  >
    All
  </button>

  <button
    onClick={fetchMovieData}
    className="relative z-10 flex items-center gap-1 rounded-full px-4 py-[5px] text-[0.82rem] font-medium text-[#6b7a8d] transition-colors duration-300 data-[active=true]:text-white"
    data-active={activeFilter === "movie"}
  >
    <Clapperboard size={14} />
    Movies
  </button>

  <button
    onClick={fetchSeriesData}
    className="relative z-10 flex items-center gap-1 rounded-full px-4 py-[5px] text-[0.82rem] font-medium text-[#6b7a8d] transition-colors duration-300"
    data-active={activeFilter === "series"}
  >
    <Tv size={14} />
    Series
  </button>
</div>
```

### But there's a better solution

Don't hardcode:

```text
left-1
left-[62px]
left-[161px]
```

because the pill will break if you change text, padding, or font size.

Instead, use **one sliding element whose position/width is calculated from the selected button**.

For React, I'd use a ref:

```jsx
const [indicator, setIndicator] = useState({
  left: 0,
  width: 0,
});
```

Then measure the active button:

```jsx
const updateIndicator = (element) => {
  setIndicator({
    left: element.offsetLeft,
    width: element.offsetWidth,
  });
};
```

And:

```jsx
<div className="relative flex w-fit gap-1 rounded-full bg-black/[0.03] p-1 dark:bg-white/[0.04]">

  <div
    className="
      absolute top-1 bottom-1
      rounded-full
      bg-[linear-gradient(135deg,var(--red),var(--red-dark))]
      shadow-[0_2px_12px_var(--red-glow)]
      transition-[left,width]
      duration-300
      ease-out
    "
    style={{
      left: indicator.left,
      width: indicator.width,
    }}
  />

  {/* buttons */}
</div>
```

Now the animation is literally:

```css
transition: left 300ms ease-out, width 300ms ease-out;
```

so the pill **slides and resizes** between tabs instead of the background flashing between states.

### One more improvement

For the effect you're after, I'd actually make the structure:

```text
┌─────────────────────────────────────┐
│  ┌─────┐                            │
│  │ All │  Movies      Series        │
│  └─────┘                            │
└─────────────────────────────────────┘
       ↓
     slides
             ┌───────────────┐
             │    Movies     │
             └───────────────┘
```

The **buttons themselves stay transparent**. Only the single absolute pill moves underneath them.

That's the key difference from your current implementation.

If you want the **exact uiCookies-style animation**, including the pill sliding with a slightly springy/eased movement, I'd use `duration-300` with a custom cubic-bezier rather than `transition-all`. The sliding-indicator approach is also a common pattern for animated tabs. ([smoothui.dev][2])

[1]: https://uicookies.com/css-tabs/?utm_source=chatgpt.com "8 Free CSS Tabs & Tab Templates – Made by uiCookies"
[2]: https://smoothui.dev/docs/components/animated-tabs?utm_source=chatgpt.com "Animated Tabs | SmoothUI"
