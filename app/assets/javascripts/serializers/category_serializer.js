function CategorySerializer (collection) {
  var result = [],
      groups = _.groupBy(collection, function (el) {
        console.log(el[0])
        return el[0]
      });

  _.each(groups, function (group) {
    result.push({
      id: group[0][0],
      title: group[0][1],
      products: _.map(group, function (item) {
        return {
          id: item[2],
          tit: item[3],
          price: item[4],
          avatar: item[5]
        }
      })
    })
  })
  return result
}