var arr = [
    { id: 15 },
    { id: -1 },
    { id: 0 },
    { id: 3 },
    { id: 12.2 },
    { },
    { id: null },
    { id: NaN },
    { id: 'undefined' }
  ];
  
  var entradasInvalidas = 0;
  // Si el elemento tiene un atributo id, y su valor correspondiente es un numero
  // Y no es el valor NaN, entonces es una entrada válida
  function filtrarPorID(obj) {
    if ('id' in obj && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
      return true;
    } else {
      entradasInvalidas++;
      return false;
    }
  }
  
  var arrPorID = arr.filter(filtrarPorID);
  
  console.log('Array Filtrado\n', arrPorID);
  // [{ id: 15 }, { id: -1 }, { id: 0 }, { id: 3 }, { id: 12.2 }]
  
  console.log('Número de Entradas Invalidas = ', entradasInvalidas);
  // 4