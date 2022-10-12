arr = [
  [{ "Name": "Iran", }, { "Name": "Holanda", }],
  [{ "Name": "Qatar", }, { "Name": "França", }],
  [{ "Name": "Tunísia", }, { "Name": "Japão", }],
  [{ "Name": "Croácia", }, { "Name": "Uruguai", }],
  [{ "Name": "País de Gales", }, { "Name": "Gana", }],
  [{ "Name": "Alemanha", }, { "Name": "Camarões", }],
  [{ "Name": "Marrocos", }, { "Name": "Espanha", }],
  [{ "Name": "Brasil", }, { "Name": "Canadá", }]
]

newArrExp = [
  [{ "Name": "Iran", }, { "Name": "Holanda", }],
  [{ "Name": "Tunísia", }, { "Name": "Japão", }],
  [{ "Name": "País de Gales", }, { "Name": "Gana", }],
  [{ "Name": "Marrocos", }, { "Name": "Espanha", }],
  [{ "Name": "Qatar", }, { "Name": "França", }],
  [{ "Name": "Croácia", }, { "Name": "Uruguai", }],
  [{ "Name": "Alemanha", }, { "Name": "Camarões", }],
  [{ "Name": "Brasil", }, { "Name": "Canadá", }]
]

newArr =[]
newArrTemp =[]
for (let i = 0; i < arr.length; i += 2) {
  newArr.push(arr[i]);
  newArrTemp.push(arr[i+1]);
}
arr = newArr.concat(newArrTemp);

console.log(arr)

0 - 2
4 - 6
1 - 3
5 - 7