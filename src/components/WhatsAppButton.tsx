"use client";

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
}

export function WhatsAppButton({
  message = "Hello! I'm interested in OUNUU Health Alliance's healthcare services. How can I learn more or get involved?",
  phoneNumber = "2348063289585",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="WhatsApp"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="white"
        style={{ flexShrink: 0 }}
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.738 5.478 2.031 7.778L0 32l8.401-2.021C10.665 31.245 13.253 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.469 0-4.882-.683-6.988-1.976l-.501-.291-5.197 1.251 1.272-4.949-.321-.519C2.77 20.774 2 18.444 2 16 2 8.82 8.82 2 16 2s14 6.82 14 14-6.82 13.333-14 13.333z" />
        <path d="M22.864 18.848c-.384-.192-2.274-1.122-2.626-1.251-.352-.129-.608-.192-.864.192-.257.384-.992 1.251-1.217 1.507-.224.257-.448.288-.832.096-.384-.192-1.621-.597-3.088-1.906-1.142-1.018-1.912-2.276-2.136-2.66-.225-.384-.024-.592.168-.783.173-.173.384-.448.576-.672.192-.225.256-.384.384-.64.128-.257.064-.48-.032-.672-.096-.192-.864-2.084-1.184-2.853-.312-.749-.629-.647-.864-.659-.224-.011-.48-.013-.736-.013s-.672.096-1.024.48c-.352.384-1.344 1.314-1.344 3.205s1.376 3.717 1.568 3.973c.192.257 2.708 4.135 6.561 5.797.917.395 1.633.631 2.191.808.921.293 1.759.252 2.421.153.738-.11 2.274-.93 2.595-1.827.321-.898.321-1.667.225-1.827-.096-.16-.352-.257-.736-.448z" />
      </svg>
    </a>
  );
}
