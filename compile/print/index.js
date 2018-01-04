module.exports = (step, name, jsonify = true) => {
  const print = result => {
    const prettyResult = jsonify ? JSON.stringify(result, null, 2) : result;
    console.log(`Step ${step}: ${name}`);
    console.log(prettyResult);
    return result;
  };
  return print;
};
