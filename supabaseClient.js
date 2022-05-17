import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ppenkmnguixugjhncbgo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZW5rbW5ndWl4dWdqaG5jYmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI3Nzg0MjEsImV4cCI6MTk2ODM1NDQyMX0.R4OCAOCt3fw3qOQzzZGLkdet0Tu0CCsLjcoFyAiZdKw'
export const supabaseClient = createClient(supabaseUrl, supabaseKey)