export default function(data) {
  // Pegando a tag principal que ira receber o menu.
  const tree = document.querySelector('nav#tree');

  // Recebe toda a arvore de elemento.
  const menu = document.createElement('ul');

  const firstLevel = data.filter(item => !item.parent);
  // Se o parant for null, quer dizer que ele e o primeiro
  // console.log(firstLevel)
  const getFirstLis = firstLevel.map(buildTree);
  // O "map" esta capturando o retorno da função, ou seja a "li".
  getFirstLis.forEach(li => menu.append(li));
  // Estou adcionando a "li" no "menu".

  firstLevel.forEach(buildTree)

  function buildTree(item) {
    // Para cada item eu quero criar um li.
    const li = document.createElement('li');
    li.innerHTML = item.name;
    // quero so o nome do item.

    const children = data.filter(child => child.parent === item.id);
    // Ele vai estar verificando se o parent bate com o id do item.

    if(children.length > 0) {
      // Somente se ele tiver um filho ele vai fazer isso.

      // adciona um clique para os parents
      li.addEventListener('click', event => {
        event.stopPropagation();
          // Para não misturar com o click de outros caras.
        event.target.classList.toggle('open');
      });

      // adciona uma classe identificadora de que ten filhos.

      li.classList.add('has-children')
        // Ele so vai adcionar essa class se tiver um filho.

      // Controi o sub menu dos filhos.
      const subMenu = document.createElement('ul');
      children.map(buildTree)
        .forEach(li => subMenu.append(li));
      // recursividade: e quando uma função ja outra ate ela parar.
      li.append(subMenu)
    }

    return li;
  }

  // Primeiro elemento.
  // const li = document.createElement('li');

  // li.innerHTML = 'Eletronics';

  // Adcionar os elementos ao menu.
  // menu.append(li);

  // adcionar o menu no html.
  tree.append(menu);
  // Estou colocando a ul na tree.
}