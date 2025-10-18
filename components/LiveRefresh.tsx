cat > components/LiveRefresh.tsx <<'EOF'
"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LiveRefresh() {
  useEffect(() => {
    const channel = supabase
      .channel("messages-insert")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        () => {
          // Simple + reliable: refresh the whole page on new rows
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
EOF