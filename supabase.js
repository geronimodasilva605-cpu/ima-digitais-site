const SUPABASE_URL = "https://vzqndrnwgpvbawjuezsd.supabase.co";

const SUPABASE_KEY = "sb_publishable_Ob3owo-lP6TCJbnTPW7Ecg_wyvaoEps";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function carregarDashboard() {

    console.log("Dashboard iniciado");

    // CLIENTES
    const { count: clientes, error: erroClientes } =
        await supabaseClient
            .from("clientes")
            .select("*", {
                count: "exact",
                head: true
            });

    // EQUIPA
    const { count: membros, error: erroEquipa } =
        await supabaseClient
            .from("equipa")
            .select("*", {
                count: "exact",
                head: true
            });

    console.log("Total de clientes:", clientes);
    console.log("Total da equipa:", membros);

    if (erroClientes) {
        console.error("Erro clientes:", erroClientes);
        return;
    }

    if (erroEquipa) {
        console.error("Erro equipa:", erroEquipa);
        return;
    }

    const cards = document.querySelectorAll(".card h2");

    console.log("Cartões encontrados:", cards.length);

    // Clientes
    if (cards.length >= 1) {
        cards[0].textContent = clientes ?? 0;
    }

    // Equipa
    if (cards.length >= 3) {
        cards[2].textContent = membros ?? 0;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    carregarDashboard
);
