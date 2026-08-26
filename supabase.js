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

    // PROJETOS
    const { count: projetos, error: erroProjetos } =
        await supabaseClient
            .from("projetos")
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

    // FATURAMENTO
    const { data: listaProjetos, error: erroFaturamento } =
        await supabaseClient
            .from("projetos")
            .select("valor");

    console.log("Clientes:", clientes);
    console.log("Projetos:", projetos);
    console.log("Equipa:", membros);
    console.log("Projetos para faturamento:", listaProjetos);

    if (erroClientes) {
        console.error("Erro clientes:", erroClientes);
        return;
    }

    if (erroProjetos) {
        console.error("Erro projetos:", erroProjetos);
        return;
    }

    if (erroEquipa) {
        console.error("Erro equipa:", erroEquipa);
        return;
    }

    if (erroFaturamento) {
        console.error("Erro faturamento:", erroFaturamento);
        return;
    }

    // Somar valores dos projetos
    let faturamento = 0;

    listaProjetos.forEach(projeto => {
        faturamento += Number(projeto.valor) || 0;
    });

    console.log("Faturamento total:", faturamento);

    const cards = document.querySelectorAll(".card h2");

    console.log("Cartões encontrados:", cards.length);

    // CLIENTES
    if (cards.length >= 1) {
        cards[0].textContent = clientes ?? 0;
    }

    // PROJETOS
    if (cards.length >= 2) {
        cards[1].textContent = projetos ?? 0;
    }

    // EQUIPA
    if (cards.length >= 3) {
        cards[2].textContent = membros ?? 0;
    }

    // FATURAMENTO
    if (cards.length >= 4) {
        cards[3].textContent =
            faturamento.toLocaleString("pt-AO") + " Kz";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    carregarDashboard
);
