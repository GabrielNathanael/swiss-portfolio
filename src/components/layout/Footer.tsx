import Link from "next/link";

const footerLinks = [
  {
    href: "https://github.com/GabrielNathanael",
    label: "GitHub",
    external: true,
  },
  {
    href: "https://linkedin.com/in/gabriel-nathanael-purba",
    label: "LinkedIn",
    external: true,
  },
  {
    href: "mailto:gabrielnathanael81@gmail.com",
    label: "Email",
    external: true,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-grid">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10">
          {/* Left */}
          <div className="flex flex-col gap-1">
            <span
              className="font-bold text-sm tracking-tight text-text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gabriel Nathanael Purba
            </span>
            <span className="text-label text-text-tertiary">
              Full Stack Developer — {year}
            </span>
          </div>

          {/* Right */}
          <ul className="flex items-center gap-6">
            {footerLinks.map(({ href, label, external }) => (
              <li key={href}>
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-label text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
