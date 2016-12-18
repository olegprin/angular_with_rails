function ProductSerializer (collection) {
  var result = [];
  _.each(collection, function (group) {
    result.push({
      id: group[0],
      avatar_lm: group[1],
      title: group[2],
      description: group[3],
      price: group[4],
      avatar_url: group[5],
      type_sell: group[6],
      adress: group[7],
      latitude: group[8],
      longitude: group[9],
      avatar: group[10]
    })
  })
  return result
}