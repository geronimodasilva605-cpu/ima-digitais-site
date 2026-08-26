const SUPABASE_URL = "https://vzqndrnwgpvbawjuezsd.supabase.co";

const SUPABASE_KEY = "sb_publishable_Ob3owo-lP6TCJbnTPW7Ecg_wyvaoEps";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function carregarDashboard() {

    console.log("Dashboard iniciado");

    const { count, error } = await supabaseClient
        .from("clientes")
        .select("*", {
            count: "exact",
            head: true
        });

    console.log("Total de clientes:", count);
    console.log("Erro:", error);

    if (error) {
        console.error("Erro ao buscar clientes:", error);
        return;
    }

    const cards = document.querySelectorAll(".card h2");

    console.log("Cartões encontrados:", cards.length);

    if (cards.length >= 1) {
        cards[0].textContent = count ?? 0;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    carregarDashboard
);
