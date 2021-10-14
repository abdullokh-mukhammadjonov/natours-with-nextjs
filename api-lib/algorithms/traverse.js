function allPaths(root) {
  let stack = [];
  let result = [];

  // checks if object
  const isObject = value => typeof value === "object";

  stack.push(root);
  while (stack.length > 0) {
    let node = stack.pop();
    if (isObject(node)) {
      Object.entries(node).forEach(([childNodeKey, childNodeValue]) => {
        if (isObject(childNodeValue)) {
          const newObject = Object.fromEntries(
            Object.entries(childNodeValue).map(([cnk, cnv]) => {
              return [`${childNodeKey}.${cnk}`, cnv];
            })
          );
          stack.push(newObject);
        } else {
          stack.push(`${childNodeKey}^${childNodeValue}`);
        }
      })
    } else {
      const keyAndValue = node.split('^')
      // approach 1)
      // const key = keyAndValue[0]
      // const value = keyAndValue[1]
      // dynamic key setting
      // result.push({[key]: value});

      // or in short,
      // dynamic key setting
      result.push({[keyAndValue[0]]: keyAndValue[1]});
    }
  }
  return result.reverse();
}


var data = {
    key1: {
        children: {
            key2:'value',
            key3:'value',
            key4: value
        }, 
    key5: 'value'
}}


const resu = allPaths(root)
console.log(resu)