"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LiveRefresh() {
  useEffect(() => {
    // Subscribe to real-time changes on the "messages" table
    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        () => {
          // Refresh the page data when a new message arrives
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }
      )
      .subscribe();

    // Cleanup when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}