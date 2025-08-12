export const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm ${className}`}>{children}</div>
);

export const CardHeader = ({ className = "", title, subtitle, actions }) => (
  <div className={`flex items-center justify-between p-4 ${className}`}>
    <div>
      <div className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
    </div>
    {actions}
  </div>
);

export const CardContent = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);