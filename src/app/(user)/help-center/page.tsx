import DashboardPageLayout from "@/components/dashboard/DashboardPage";

import {
  HelpPage,
  TawkChat,
} from "@/components/help";

export default function HelpCenterPage() {
  return (
    <DashboardPageLayout
      environment="user"
      breadcrumb={[
        {
          label: "Help Center",
        },
      ]}
    >
      <TawkChat />

      <HelpPage />
    </DashboardPageLayout>
  );
}