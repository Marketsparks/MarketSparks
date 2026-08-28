"use client";

type UserAction =
  | "activate"
  | "deactivate"
  | "restore"
  | "approveDeletion"
  | "delete";

type UserActionsProps = {
  status:
    | "PENDING_VERIFICATION"
    | "ACTIVE"
    | "SUSPENDED"
    | "DEACTIVATED"
    | "PENDING_DELETION";

  disabled?: boolean;

  onAction: (
    action: UserAction,
  ) => void;
};

type ActionButtonProps = {
  label: string;
  action: UserAction;
  disabled: boolean;
  danger?: boolean;
  onClick: (
    action: UserAction,
  ) => void;
};

function ActionButton({
  label,
  action,
  disabled,
  danger = false,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() =>
        onClick(action)
      }
      className="
        rounded-xl
        border
        px-3
        py-2
        text-sm
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
      style={{
        background: danger
          ? "var(--admin-button-danger-bg)"
          : "var(--admin-button-secondary-bg)",

        color: danger
          ? "var(--admin-button-danger-text)"
          : "var(--admin-button-secondary-text)",

        borderColor: danger
          ? "transparent"
          : "var(--admin-button-secondary-border)",
      }}
    >
      {label}
    </button>
  );
}

export function UserActions({
  status,
  disabled = false,
  onAction,
}: UserActionsProps) {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-2
      "
    >
      {status ===
        "ACTIVE" && (
        <>
          <ActionButton
            label="Deactivate"
            action="deactivate"
            disabled={disabled}
            onClick={onAction}
          />

          <ActionButton
            label="Delete Permanently"
            action="delete"
            danger
            disabled={disabled}
            onClick={onAction}
          />
        </>
      )}

      {status ===
        "DEACTIVATED" && (
        <>
          <ActionButton
            label="Activate"
            action="activate"
            disabled={disabled}
            onClick={onAction}
          />

          <ActionButton
            label="Delete Permanently"
            action="delete"
            danger
            disabled={disabled}
            onClick={onAction}
          />
        </>
      )}

      {status ===
        "PENDING_DELETION" && (
        <>
          <ActionButton
            label="Restore Account"
            action="restore"
            disabled={disabled}
            onClick={onAction}
          />

          <ActionButton
            label="Approve Deletion"
            action="approveDeletion"
            danger
            disabled={disabled}
            onClick={onAction}
          />
        </>
      )}
    </div>
  );
}