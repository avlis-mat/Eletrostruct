import { prisma } from "./";

const main = async () => {
  console.log("Iniciando Seed do DB");

  // categorias
  const categorias = [
    { nome: "Áudio" },
    { nome: "Periféricos" },
    { nome: "Computadores e Monitores" },
    { nome: "Hardware e Armazenamento" },
    { nome: "Leitura Digital" },
    { nome: "Kits e Setups" },
  ];

  for (const cat of categorias) {
    await prisma.categoria.create({
      data: cat,
    });
  }

  console.log("Categorias Criadas!");

  // Produtos (Já conectados aos IDs das categorias)
  const produtos = [
    {
      nome: "Caixa de Som Portátil JBL",
      descricao:
        "Áudio de alta qualidade e resistência à água, ideal para levar a música a qualquer ambiente.",
      preco: 350.0,
      imagemUrl: "/produtos/caixinha_som_jbl.jpg",
      categorias: { connect: [{ id: 1 }] },
    },
    {
      nome: "Caixa de Som Bluetooth Marshall",
      descricao:
        "Design clássico e vintage com graves potentes para uma experiência sonora imersiva.",
      preco: 950.0,
      imagemUrl: "/produtos/caixinha_som_marshall.jpg",
      categorias: { connect: [{ id: 1 }] },
    },
    {
      nome: "Caixa de Som Sony Extra Bass",
      descricao:
        "Som portátil com reforço de graves e bateria de longa duração para festas e uso diário.",
      preco: 420.0,
      imagemUrl: "/produtos/caixinha_som_sony.jpg",
      categorias: { connect: [{ id: 1 }] },
    },
    {
      nome: "Headset Gamer com Microfone",
      descricao:
        "Áudio direcional perfeito para comunicação fluida durante partidas competitivas.",
      preco: 280.0,
      imagemUrl: "/produtos/headset_gamer.jpg",
      categorias: { connect: [{ id: 1 }] },
    },
    {
      nome: "Mouse Gamer de Alta Precisão (Com Fio)",
      descricao:
        "Resposta imediata e sensor óptico avançado para jogos e tarefas que exigem agilidade.",
      preco: 150.0,
      imagemUrl: "/produtos/mouse_gamer_com_fio.jpg",
      categorias: { connect: [{ id: 2 }] },
    },
    {
      nome: "Mouse Gamer Wireless",
      descricao:
        "Liberdade de movimento sem lag, bateria de alta durabilidade e cliques silenciosos.",
      preco: 299.0,
      imagemUrl: "/produtos/mouse_gamer_sem_fio.jpg",
      categorias: { connect: [{ id: 2 }] },
    },
    {
      nome: "Mousepad Ergonômico com Apoio",
      descricao:
        "Conforto extra para os pulsos durante longas horas de uso do computador.",
      preco: 45.0,
      imagemUrl: "/produtos/mousepad_pulso.jpg",
      categorias: { connect: [{ id: 2 }] },
    },
    {
      nome: "Teclado Mecânico RGB",
      descricao:
        "Switches táteis para uma digitação rápida e precisa ao escrever scripts longos.",
      preco: 320.0,
      imagemUrl: "/produtos/teclado_mecanico.jpg",
      categorias: { connect: [{ id: 2 }] },
    },
    {
      nome: 'Monitor Ultrawide 34"',
      descricao:
        "Tela estendida excelente para dividir janelas durante a programação ou visualizar gráficos complexos.",
      preco: 1850.0,
      imagemUrl: "/produtos/monitor_ultrawide.jpg",
      categorias: { connect: [{ id: 3 }] },
    },
    {
      nome: "Notebook Gamer de Alta Performance",
      descricao:
        "Hardware robusto, excelente para rodar jogos exigentes ou compilar linguagens pesadas.",
      preco: 5400.0,
      imagemUrl: "/produtos/notebook_gamer.jpg",
      categorias: { connect: [{ id: 3 }] },
    },
    {
      nome: "SSD NVMe M.2 1TB",
      descricao:
        "Velocidade extrema de leitura e gravação, perfeito para configurar partições robustas de dual boot.",
      preco: 520.0,
      imagemUrl: "/produtos/ssd_nvme.jpg",
      categorias: { connect: [{ id: 4 }] },
    },
    {
      nome: "Leitor Digital E-reader",
      descricao:
        "Tela antirreflexo e bateria que dura semanas. Ideal para sistemas de leitura abertos e dicionários.",
      preco: 499.0,
      imagemUrl: "/produtos/kindle.jpg",
      categorias: { connect: [{ id: 5 }] },
    },
    {
      nome: "Kit Teclado e Mouse Sem Fio",
      descricao:
        "Praticidade e organização minimalista para o seu ambiente de trabalho ou estudos acadêmicos.",
      preco: 180.0,
      imagemUrl: "/produtos/kit_teclado_mouse.jpg",
      categorias: { connect: [{ id: 6 }] },
    },
    {
      nome: "Estação de Trabalho Completa",
      descricao:
        "O ambiente de setup integrado focado em produtividade máxima e conforto visual para o dia a dia.",
      preco: 3500.0,
      imagemUrl: "/produtos/setup_completo.jpg",
      categorias: { connect: [{ id: 6 }] },
    },
  ];

  for (const prod of produtos) {
    await prisma.produto.create({
      data: prod,
    });
  }
  console.log("Produtos criados e vinculados às categorias!");

  console.log("Seed concluído!");
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
