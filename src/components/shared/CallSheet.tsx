import React from 'react';

interface CallSheetRow {
  label: string;
  value: string;
}

interface CallSheetProps {
  title?: string;
  subtitle?: string;
  rows: CallSheetRow[];
  className?: string;
}

export function CallSheet({
  title = 'Call sheet',
  subtitle = 'Prod.',
  rows,
  className = '',
}: CallSheetProps) {
  return (
    <aside className={`mv-callsheet ${className}`.trim()} aria-label={title}>
      <div className="mv-callsheet-head">
        <span className="mv-callsheet-title">{title}</span>
        <span className="mv-callsheet-sub">{subtitle}</span>
      </div>
      <dl className="mv-callsheet-rows">
        {rows.map((row) => (
          <div key={row.label} className="mv-callsheet-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
