import { Database as DB } from "@/lib/database.types";

type Card = DB['public']['Tables']['cards']['Row']

type Profile = DB['public']['Tables']['profiles']['Row']

declare global {
  type Database = DB;
  type CardWithAuthor = Card & {
    author: Profile;
  }
}