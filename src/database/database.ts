import { createClient } from "@supabase/supabase-js";

const VITE_SUPABASE_URL = "https://gyctzxbuklqutliozjov.supabase.co";
const VITE_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3R6eGJ1a2xxdXRsaW96am92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2MzE0MjgsImV4cCI6MjAyODIwNzQyOH0.bt1rsbBrdL4-0s2DxHX9s_U9I0H0_DXhAq_cjnYMjrI";

export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);
