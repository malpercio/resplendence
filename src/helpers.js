


module.exports = {
  getOrFail(name) {
    const envValue = process.env[name];
    if (envValue === undefined){
      process.exitCode = 4134;
      throw new Error("Environment variable ${name} not set. Execution terminated.")
    }
    return envValue;
  }
};
