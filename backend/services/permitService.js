import Permit from 'permitio';

const permit = new Permit({
  // pdp: "https://cloudpdp.api.permit.io", // O la URL de tu PDP si tienes uno propio
  pdp:"http://localhost:7766",
  token: process.env.PERMIT_API_KEY,
  log: {
    level: "debug",
  }
});

export default permit;