function UserSerializer (collection) {
  var result = [];

  _.each(collection, function (item) {
    result.push({
      id: item[0],
      created_at: item[1],
      updated_at: item[2],
      name: item[3],
      avatar_url: item[4],
      rating: item[5],
      banned: item[6]
    })
  })
  return result
}