import React from "react";

export interface AgentLogoProps {
  id?: string;
  className?: string;
}

export function AgentLogo({ id = "titan-vault", className = "size-5" }: AgentLogoProps) {
  const normId = id.toLowerCase().replace(/_/g, "-");

  // OxiPulse: Vital Telemetry ECG Pulse Waveform
  if (normId.includes("oxi")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M3 12h3.5l2.5-6.5 3.8 13.5 3.2-9.5 2 5 2-2.5h4" />
        <circle cx="12.8" cy="12" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  // FerroSentry: Cyber Sentry Iron Shield with Targeting / Lock Core
  if (normId.includes("ferro")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2.5L4 6.2v5.6c0 5.6 3.4 10.8 8 12.2 4.6-1.4 8-6.6 8-12.2V6.2L12 2.5z" />
        <circle cx="12" cy="11.5" r="3" strokeWidth="1.8" />
        <path d="M12 6.5v2M12 14.5v2M7 11.5h2M15 11.5h2" strokeWidth="1.8" />
      </svg>
    );
  }

  // CupraFlow: Flowing Mesh / Synchronized Failover Loop
  if (normId.includes("cupra")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="6" cy="6" r="2.5" fill="currentColor" fillOpacity="0.25" />
        <circle cx="18" cy="6" r="2.5" fill="currentColor" fillOpacity="0.25" />
        <circle cx="12" cy="18" r="2.5" fill="currentColor" fillOpacity="0.25" />
        <path d="M8.5 6h7" />
        <path d="M7.5 8.2l3.5 7.5" />
        <path d="M16.5 8.2l-3.5 7.5" />
        <circle cx="12" cy="10" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  // CromoForge: Hexagonal Container / GitOps Anvil
  if (normId.includes("cromo")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
        <path d="M12 12l9-5M12 12v10M12 12L3 7" strokeWidth="1.8" />
      </svg>
    );
  }

  // Default: TitanVault - Octagonal Armored Vault Door / Safe Locking Mechanism
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4.2" strokeWidth="2" />
      <path d="M12 8v8M8 12h8" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="6.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="6.5" cy="17.5" r="1" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="1" fill="currentColor" />
    </svg>
  );
}
