import {
  dashboardInputClass,
  dashboardPanelClass,
  dashboardSelectMdClass,
} from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";

export type OpsFilterOption = {
  value: string;
  label: string;
};

type OpsTableToolbarProps = {
  searchId: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilterId?: string;
  statusLabel?: string;
  statusValue?: string;
  statusOptions?: OpsFilterOption[];
  onStatusChange?: (value: string) => void;
  totalCount: number;
  visibleCount: number;
  loading?: boolean;
  className?: string;
};

export function OpsTableToolbar({
  searchId,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  statusFilterId,
  statusLabel = "Status",
  statusValue = "",
  statusOptions,
  onStatusChange,
  totalCount,
  visibleCount,
  loading,
  className,
}: OpsTableToolbarProps) {
  const filtered = visibleCount !== totalCount || Boolean(searchValue) || Boolean(statusValue);
  const showStatus = statusOptions && statusOptions.length > 0 && onStatusChange && statusFilterId;

  return (
    <div
      className={cn(
        "flex flex-col gap-5 p-4 md:flex-row md:flex-wrap md:items-end",
        dashboardPanelClass,
        className
      )}
    >
      <div className="min-w-[200px] flex-1">
        <label htmlFor={searchId} className="mb-1.5 block text-xs font-medium text-zinc-500">
          Search
        </label>
        <input
          id={searchId}
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          disabled={loading}
          className={dashboardInputClass}
        />
      </div>
      {showStatus ? (
        <div className="w-full min-w-[140px] md:w-44">
          <label htmlFor={statusFilterId} className="mb-1.5 block text-xs font-medium text-zinc-500">
            {statusLabel}
          </label>
          <select
            id={statusFilterId}
            value={statusValue}
            onChange={(e) => onStatusChange(e.target.value)}
            disabled={loading}
            className={dashboardSelectMdClass}
          >
            <option value="">All</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <p className="text-xs tabular-nums text-zinc-500 md:pb-2.5">
        {loading ? (
          "Loading rows…"
        ) : (
          <>
            <span className="font-medium text-zinc-300">{visibleCount}</span>
            {" of "}
            <span className="font-medium text-zinc-300">{totalCount}</span>
            {filtered ? " · filtered" : " · live read-only"}
          </>
        )}
      </p>
    </div>
  );
}
