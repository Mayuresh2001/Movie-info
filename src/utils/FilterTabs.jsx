function FilterTab({
    active,
    isDark,
    icon,
    children,
    onClick=()=>{},
}) {
    return (
        <button
            onClick={onClick}
            className={`
        flex items-center justify-center
        rounded-full text-[0.82rem] font-medium py-1.5 px-4
        font-['Inter',sans-serif]
        cursor-pointer
        transition-all duration-(--transition)
        ${active ? `
              border-transparent
              bg-[linear-gradient(135deg,var(--red),var(--red-dark))]
              text-white
              shadow-[0_2px_12px_var(--red-glow)]
            `: isDark ? `
                border-white/10
                text-[#6d7988]
                hover:border-[rgba(230,57,70,0.4)]
                hover:bg-[rgba(230,57,70,0.1)]
                hover:text-[#e0e0e0]
              `: `
                text-[#6b7a8d]
                hover:border-[rgba(230,57,70,0.3)]
                hover:bg-[rgba(230,57,70,0.07)]
                hover:text-[#1a1d2e]
              `}`}>
            {icon && <span className="mx-1">{icon}</span>}
            {children}
        </button>
    );
}

export default FilterTab;