export async function getProfile(req, res) {
  const { id } = req.params;

  // Aquí consultarías a tu base de datos real, de momento simulamos
  const profile = {
    id,
    name: "andres ram",
    email: "andres@example.com",
    role: "employee",
  };

  // Verificar permisos usando Permit.io
  try {
    const allowed = await req.permit.check({
      user: req.auth.userId,
      action: 'read',
      resource: 'profile',
      resourceId: id,
    });

    if (!allowed) {
      return res.status(403).json({ message: "You are not allowed to see this information." });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in permissions verification." });
  }
}
