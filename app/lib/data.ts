import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAllCards() {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .order("created_at", { ascending: true });
  
    const cards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];
  
      return cards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }
}

export async function fetchAllCardsAndSort(sort: string, ascending: boolean) {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .order(sort, { ascending: ascending });
  
    const cards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];
  
      return cards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }
}

export async function fetchMostRecentCard() {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .order("created_at", { ascending: false })
      .limit(1)
  
    const card =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];
  
      return card;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }
}

export async function fetchOldestPendingCards() {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/login");
    }

    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .eq('complete', false)
      .order("created_at", { ascending: true })
      .limit(4);

    const pendingCards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];
    return pendingCards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }

}

export async function fetchRecentlySentCards() {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      redirect("/login");
    }
    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .eq('complete', true)
      .order("created_at", { ascending: false })
      .limit(4);
    const sentCards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];

    return sentCards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }

}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredCards(
  giftQuery: string,
  gifterQuery: string,
  currentPage: number,
  order: string,
  ascending: boolean
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;


  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .ilike('gift', `%${giftQuery}%`)
      .ilike('gifter', `%${gifterQuery}%`)
      .order(order, { ascending: ascending })
      .range(offset, offset + ITEMS_PER_PAGE - 1)
  
    const cards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];
  
      return cards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }
}

export async function fetchCardById(id: string) {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .eq('id', id)
  
    const cards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];
  
      return cards[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCardPages(
  giftQuery: string,
  gifterQuery: string,
) {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    const { count } = await supabase
      .from("cards")
      .select('*', { count: 'exact', head: true })
      .ilike('gift', `%${giftQuery}%`)
      .ilike('gifter', `%${gifterQuery}%`)
  
      const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  
      return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total pages.');
  }
}