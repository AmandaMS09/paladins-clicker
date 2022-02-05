// Variaveis de imagem dos personagens
const grohk = "img/grohk.png", maeve = "img/maeve.png", evie = "img/evie.png";
// Array de campeoes
const campeoes = [grohk, maeve, evie];
// Valores iniciais
    // Abates
    let abates;
    // Barra de vida
    const vida_num = document.getElementById("num_vida")
    let vida_barra = 200;
    // Dano
    let dano_num = 5, dano_barra
    // Personagem
    const nome = document.getElementById("nome")
    const doc_inimigo = document.getElementById("inimigo")
    const doc_img = document.getElementById("imagem")
    let max_hp;
    // Dinheiro
    let creditos = 0
    let cpa = 40; // Credito por abate
    // Upgrades
    let bala, preco_bala
    let carteira, preco_carteira
    let torreta, preco_torreta;
    // Multiplicadores
    let mult_hp = 1
    let mult_bala, mult_carteira, mult_torreta; // Multiplicadores do valor de cada upgrade

// Funcoes
    // Funcoes de modificacao de tamanho de imagem
    function img_menor() {
        document.getElementById("imagem").style.height = "300px";
    }
    function img_maior() {
        document.getElementById("imagem").style.height = "310px";
    }
    // Funcao de especificacao do personagem(nome e vida de acordo com a imagem randomizada)
    function info_get() {
        let imagem = doc_img.getAttribute("src")
        if (imagem == grohk) {
            nome.innerHTML = "Grohk"
            max_hp = 2200 * mult_hp;
        }else if (imagem == maeve) {
            nome.innerHTML = "Maeve"
            max_hp = 1900 * mult_hp;
        }else if (imagem == evie) {
            nome.innerHTML = "Evie"
            max_hp = 1800 * mult_hp;
        }
        max_hp = Math.round(max_hp) // Pontos de vida arredondados
        dano_barra = 200 / (max_hp / dano_num); // Diminuicao da barra de vida e equivalente a {divisao de seu tamanho pela (divisao da vida maxima pelo dano atual do usuario)}
    }
    // Funcao de atribuicao das informacoes do campeao
    function inimigo_set() {
        doc_img.setAttribute("src", campeoes[Math.floor(Math.random() * campeoes.length)])
        info_get()
        vida_num.innerHTML = max_hp
        vida_barra = 200
        document.getElementById("vida").style.width = vida_barra +"px";
    }
    // Funcao de gestao de abates
    function abate() {
        if (vida_num.innerHTML < 1) {
            inimigo_set() // Mudanca de inimigo
            abates += 1 // Adicao do numero de abates
            creditos += cpa // Ganho de creditos
            document.getElementById("creditos").innerHTML = creditos;
            if(abates % 5 == 0) { // Aumento da vida dos inimigos a cada 5 abates
                mult_hp += 0.25;
            }
        }
    }
    // Funcao de dano
    function vida_change() {
        vida_num.innerHTML -= dano_num
        vida_barra -= dano_barra
        document.getElementById("vida").style.width = vida_barra +"px"
        abate();
    }
    // Funcao de interacao com numero de abates

// Acionamento das funcoes
    // Colocando a imagem do personagem inicial
    document.addEventListener('DOMContentLoaded', inimigo_set); // Acontece quando a pagina e totalmente carregada
    // Diminuicao da imagem ao clicar
    doc_inimigo.addEventListener('mousedown', img_menor)
    doc_inimigo.addEventListener('touchstart', img_menor)
    doc_inimigo.addEventListener('pointerdown', img_menor);
    // Aumento da imagem apos termino do clique
    doc_inimigo.addEventListener('mouseup', img_maior)
    doc_inimigo.addEventListener('touchend', img_maior)
    doc_inimigo.addEventListener('pointerup', img_maior);
    // Diminuicao da vida ao clicar
    doc_inimigo.addEventListener('click', vida_change)