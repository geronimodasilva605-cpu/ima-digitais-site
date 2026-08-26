const SUPABASE_URL = "https://vzqndrnwgpvbawjuezsd.supabase.co";

const SUPABASE_KEY = "sb_publishable_Ob3owo-lP6TCJbnTPW7Ecg_wyvaoEps";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function carregarDashboard() {

    // CLIENTES
    const clientesResult = await supabaseClient
        .from("clientes")
        .select("*", { count: "exact", head: true });

    const clientes = clientesResult.count;

    // PROJETOS
    const projetosResult = await supabaseClient
        .from("projetos")
        .select("*", { count: "exact", head: true });

    const projetos = projetosResult.count;

    // EQUIPA
    const equipaResult = await supabaseClient
        .from("equipa")
        .select("*", { count: "exact", head: true });

    const membros = equipaResult.count;

    // FATURAMENTO
    const faturamentoResult = await supabaseClient
        .from("faturamento")
        .select("valor");

    let totalFaturamento = 0;

    if (faturamentoResult.data) {
        totalFaturamento = faturamentoResult.data.reduce(
            (total, item) => total + Number(item.valor || 0),
            0
        );
    }

    const cards = document.querySelectorAll(".card h2");

    if (cards.length >= 4) {

        cards[0].textContent = clientes ?? 0;

        cards[1].textContent = projetos ?? 0;

        cards[2].textContent = membros ?? 0;

        cards[3].textContent =
            totalFaturamento.toLocaleString("pt-PT") + " Kz";
    }

    console.log("Clientes:", clientes);
    console.log("Projetos:", projetos);
    console.log("Equipa:", membros);
    console.log("Faturamento:", totalFaturamento);
}

document.addEventListener(
    "DOMContentLoaded",
    carregarDashboard
);
