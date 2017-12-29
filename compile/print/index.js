module.exports = (step, name) => {
  const print = result => {
    console.log(`Step ${step}: ${name}`);
    console.log(JSON.stringify(result, null, 2));
    return result;
  };
  return print;
};
