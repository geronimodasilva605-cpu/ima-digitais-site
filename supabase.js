const SUPABASE_URL = "https://vzqndrnwgpvbawjuezsd.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ob3owo-lP6TCJbnTPW7Ecg_wyvaoEps";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function carregarDashboard() {
  try {
    const { count: clientes, error: erroClientes } =
      await supabaseClient
        .from("clientes")
        .select("*", { count: "exact", head: true });

    const { count: projetos, error: erroProjetos } =
      await supabaseClient
        .from("projetos")
        .select("*", { count: "exact", head: true });

    const { count: membros, error: erroEquipa } =
      await supabaseClient
        .from("equipa")
        .select("*", { count: "exact", head: true });

    const { data: faturamentos, error: erroFaturamento } =
      await supabaseClient
        .from("faturamento")
        .select("valor");

    if (erroClientes) throw erroClientes;
    if (erroProjetos) throw erroProjetos;
    if (erroEquipa) throw erroEquipa;
    if (erroFaturamento) throw erroFaturamento;

    const totalFaturamento = (faturamentos || []).reduce(
      (total, item) => total + Number(item.valor || 0),
      0
    );

    const cards = document.querySelectorAll(".card h2");

    if (cards.length >= 4) {
      cards[0].textContent = clientes || 0;
      cards[1].textContent = projetos || 0;
      cards[2].textContent = membros || 0;
      cards[3].textContent =
        totalFaturamento.toLocaleString("pt-PT") + " Kz";
    }

    console.log("Dashboard carregado com sucesso!");
  } catch (erro) {
    console.error("Erro ao carregar Dashboard:", erro);
  }
}

document.addEventListener("DOMContentLoaded", carregarDashboard);
